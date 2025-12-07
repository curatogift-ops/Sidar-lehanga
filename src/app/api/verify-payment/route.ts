import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userDetails,
            cartItems,
        } = await request.json();

        // Validate required fields
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing payment details' },
                { status: 400 }
            );
        }

        // Verify signature
        const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
        const generatedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Payment verified successfully
        // Here you can:
        // 1. Save order to database
        // 2. Send confirmation email
        // 3. Update inventory
        // 4. Trigger webhooks

        console.log('Payment verified successfully!');
        console.log('Order ID:', razorpay_order_id);
        console.log('Payment ID:', razorpay_payment_id);
        console.log('User Details:', userDetails);
        console.log('Cart Items:', cartItems);

        // For now, just return success
        // You can extend this to save to database, send emails, etc.
        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
