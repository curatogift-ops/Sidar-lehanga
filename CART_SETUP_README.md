# Cart and Razorpay Integration Setup Guide

## Overview
This implementation adds a complete shopping cart and checkout system with Razorpay payment integration to your e-commerce store. All data is managed using localStorage (no login required).

## Features Implemented

### 1. Shopping Cart
- ✅ Add products to cart with size selection
- ✅ View cart with all items
- ✅ Update item quantities
- ✅ Remove items from cart
- ✅ Cart persistence using localStorage
- ✅ Cross-tab synchronization
- ✅ Cart icon with item count badge in navbar

### 2. Checkout Process
- ✅ User details form (Name, Phone, Address, Pincode, Email)
- ✅ Form validation
- ✅ Order summary display
- ✅ Price breakdown (Subtotal, Shipping, Tax, Total)
- ✅ Free shipping above ₹999

### 3. Razorpay Payment Integration
- ✅ Secure payment gateway
- ✅ Order creation API
- ✅ Payment verification
- ✅ Success/Failure pages
- ✅ User details sent to Razorpay

## Setup Instructions

### Step 1: Get Razorpay API Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Generate API keys (use Test Mode for development)
5. Copy both:
   - **Key ID** (starts with `rzp_test_` for test mode)
   - **Key Secret**

### Step 2: Configure Environment Variables

You need to add Razorpay keys to your `.env.local` file. Since this file is gitignored, you need to:

1. Open `.env.local` file (or create it if it doesn't exist)
2. Add these lines:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

**Important:** 
- Replace `YOUR_KEY_ID_HERE` and `YOUR_KEY_SECRET_HERE` with actual keys from Razorpay
- The `NEXT_PUBLIC_` prefix is required for `Key ID` (used in frontend)
- `Key Secret` should NOT have `NEXT_PUBLIC_` prefix (server-side only)

### Step 3: Install Dependencies (Already Done)

The Razorpay package has been installed. If you need to reinstall:

```bash
npm install
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Testing the Implementation

### Test Mode (Recommended for Development)

When using Razorpay test keys, you can use these test card details:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card Number: `4111 1111 1111 1112`
- CVV: Any 3 digits
- Expiry: Any future date

### Testing Flow

1. **Add to Cart:**
   - Navigate to any product page
   - Select a size
   - Click "ADD TO CART"
   - Check cart icon badge updates

2. **View Cart:**
   - Click cart icon in navbar
   - Verify items are displayed
   - Test quantity increase/decrease
   - Test remove item

3. **Checkout:**
   - Click "Proceed to Checkout"
   - Fill in user details:
     - Name: `Test User`
     - Phone: `9876543210`
     - Address: `Test Address, Test City, Test State`
     - Pincode: `123456`
   - Check "Terms & Conditions"
   - Click "Proceed to Payment"

4. **Payment:**
   - Razorpay popup should appear
   - Enter test card details
   - Complete payment
   - You should be redirected to success page

5. **Verify:**
   - Cart should be cleared
   - Check browser console for order details logged in API

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-order/route.ts      # Razorpay order creation
│   │   └── verify-payment/route.ts    # Payment verification
│   ├── cart/
│   │   ├── page.tsx                   # Cart page
│   │   └── cart.module.css
│   ├── checkout/
│   │   ├── page.tsx                   # Checkout page
│   │   └── checkout.module.css
│   ├── order-success/
│   │   ├── page.tsx                   # Success page
│   │   └── success.module.css
│   ├── order-failed/
│   │   ├── page.tsx                   # Failed page
│   │   └── failed.module.css
│   └── product/[id]/page.tsx          # Updated with cart functionality
├── components/
│   ├── CartIcon.tsx                   # Cart icon with badge
│   ├── CartIcon.module.css
│   └── Navbar.tsx                     # Updated with cart icon
├── lib/
│   └── razorpay.ts                    # Razorpay utility functions
├── store/
│   └── useCartStore.ts                # Zustand cart store
├── types/
│   └── types.ts                       # TypeScript definitions
└── utils/
    └── cartUtils.ts                   # Cart helper functions
```

## Key Features Explained

### LocalStorage Management
- Cart data is saved to browser localStorage
- Persists across page refreshes
- Syncs across multiple tabs
- Key: `curatogift_cart`

### Price Calculation
- **Subtotal:** Sum of all item prices
- **Shipping:** ₹99 (FREE above ₹999)
- **Tax:** 18% GST on subtotal
- **Total:** Subtotal + Shipping + Tax

### Razorpay Integration Flow
1. User fills checkout form
2. Click "Proceed to Payment"
3. API creates Razorpay order (`/api/create-order`)
4. Razorpay popup opens
5. User completes payment
6. Payment response sent to verification API
7. Signature verified for security
8. Cart cleared and redirect to success

## Troubleshooting

### Issue: Razorpay popup doesn't open
- Check browser console for errors
- Verify API keys are correctly set in `.env.local`
- Ensure `.env.local` file is in root directory
- Restart dev server after adding env variables

### Issue: Payment verification fails
- Check that `RAZORPAY_KEY_SECRET` is set (without `NEXT_PUBLIC_`)
- Verify signature verification in `/api/verify-payment`
- Check browser console and server logs

### Issue: Cart not persisting
- Check if localStorage is enabled in browser
- Clear localStorage and try again
- Check browser console for errors

## Production Deployment

When deploying to production:

1. **Get Production Keys:**
   - Use production API keys from Razorpay
   - They start with `rzp_live_`

2. **Set Environment Variables:**
   - Add keys to your hosting platform (Vercel, Netlify, etc.)
   - Never commit API keys to Git

3. **Test Thoroughly:**
   - Test with real payment methods
   - Verify order data is captured
   - Test all edge cases

4. **Enable Webhooks (Optional):**
   - Set up webhooks in Razorpay dashboard
   - Get notifications for payment events
   - Update order status automatically

## Next Steps (Optional Enhancements)

- Add order history page
- Email confirmations
- SMS notifications
- Inventory management
- Discount codes/coupons
- Multiple payment methods
- Guest checkout with email
- Wishlist functionality

## Support

For issues or questions:
- Check Razorpay documentation: https://razorpay.com/docs/
- Contact: +91 73599 78388
