from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from .models import FarmerProfile, Product, Order

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('profile_setup')
    else:
        form = UserCreationForm()
    return render(request, 'farmers/register.html', {'form': form})

@login_required
def profile_setup(request):
    if request.method == 'POST':
        phone_number = request.POST.get('phone_number')
        location = request.POST.get('location')
        farm_size = request.POST.get('farm_size')
        
        FarmerProfile.objects.create(
            user=request.user,
            phone_number=phone_number,
            location=location,
            farm_size=farm_size
        )
        return redirect('dashboard')
    return render(request, 'farmers/profile_setup.html')

@login_required
def dashboard(request):
    try:
        profile = request.user.farmerprofile
        products = Product.objects.filter(farmer=profile)
        orders = Order.objects.filter(product__farmer=profile)
        context = {
            'profile': profile,
            'products': products,
            'orders': orders
        }
        return render(request, 'farmers/dashboard.html', context)
    except FarmerProfile.DoesNotExist:
        return redirect('profile_setup')

@login_required
def product_list(request):
    products = Product.objects.all()
    return render(request, 'farmers/product_list.html', {'products': products})

@login_required
def add_product(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        price = request.POST.get('price')
        quantity = request.POST.get('quantity')
        category = request.POST.get('category')
        
        Product.objects.create(
            farmer=request.user.farmerprofile,
            name=name,
            description=description,
            price=price,
            quantity=quantity,
            category=category
        )
        return redirect('dashboard')
    return render(request, 'farmers/add_product.html')

@login_required
def place_order(request, product_id):
    if request.method == 'POST':
        product = Product.objects.get(id=product_id)
        quantity = int(request.POST.get('quantity'))
        total_price = product.price * quantity
        
        Order.objects.create(
            buyer=request.user,
            product=product,
            quantity=quantity,
            total_price=total_price
        )
        return redirect('orders')
    product = Product.objects.get(id=product_id)
    return render(request, 'farmers/place_order.html', {'product': product})

@login_required
def orders(request):
    user_orders = Order.objects.filter(buyer=request.user)
    return render(request, 'farmers/orders.html', {'orders': user_orders})