import { useState } from 'react';
import { Course } from './CourseList';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PaymentPageProps {
  course: Course;
  user: { email: string; name: string };
  onPaymentSuccess: (purchaseDetails: PurchaseDetails) => void;
  onBack: () => void;
}

export interface PurchaseDetails {
  course: Course;
  user: { email: string; name: string };
  paymentMethod: string;
  transactionId: string;
  purchaseDate: Date;
  amount: number;
}

export function PaymentPage({ course, user, onPaymentSuccess, onBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'upi' | 'netbanking' | 'paytm' | 'phonepe'
  >('card');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // UPI details
  const [upiId, setUpiId] = useState('');

  // Net Banking
  const [selectedBank, setSelectedBank] = useState('');

  // Paytm/PhonePe
  const [mobileNumber, setMobileNumber] = useState('');

  const validateCardNumber = (number: string) => {
    // Remove spaces and check if it's 16 digits
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateCardExpiry = (expiry: string) => {
    // Check format MM/YY
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/');
    const monthNum = parseInt(month);
    const yearNum = parseInt('20' + year);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) return false;
    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum < currentMonth) return false;
    return true;
  };

  const validateCVV = (cvv: string) => {
    return /^\d{3}$/.test(cvv);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate based on payment method
    if (paymentMethod === 'card') {
      if (!validateCardNumber(cardNumber)) {
        setError('Invalid card number. Please enter a valid 16-digit card number.');
        return;
      }
      if (!validateCardExpiry(cardExpiry)) {
        setError('Invalid or expired card. Please check the expiry date.');
        return;
      }
      if (!validateCVV(cardCVV)) {
        setError('Invalid CVV. Please enter a 3-digit CVV.');
        return;
      }
      if (!cardName.trim()) {
        setError('Please enter the cardholder name.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.includes('@')) {
        setError('Invalid UPI ID. Please enter a valid UPI ID.');
        return;
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        setError('Please select a bank.');
        return;
      }
    } else if (paymentMethod === 'paytm' || paymentMethod === 'phonepe') {
      if (!/^\d{10}$/.test(mobileNumber)) {
        setError('Invalid mobile number. Please enter a 10-digit number.');
        return;
      }
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const purchaseDetails: PurchaseDetails = {
        course,
        user,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit/Debit Card'
            : paymentMethod === 'upi'
            ? 'UPI'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : paymentMethod === 'paytm'
            ? 'Paytm'
            : 'PhonePe',
        transactionId: `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`,
        purchaseDate: new Date(),
        amount: course.price,
      };

      onPaymentSuccess(purchaseDetails);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-6">
          ← Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={paymentMethod}
                  onValueChange={(value: string) =>
                    setPaymentMethod(value as 'card' | 'upi' | 'netbanking' | 'paytm' | 'phonepe')
                  }
                >
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    <TabsTrigger value="paytm">Paytm</TabsTrigger>
                    <TabsTrigger value="phonepe">PhonePe</TabsTrigger>
                  </TabsList>

                  <form onSubmit={handlePayment}>
                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\s/g, '')
                              .replace(/(\d{4})/g, '$1 ')
                              .trim();
                            setCardNumber(value);
                          }}
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="JOHN DOE"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-expiry">Expiry Date</Label>
                          <Input
                            id="card-expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length >= 2) {
                                value = value.slice(0, 2) + '/' + value.slice(2, 4);
                              }
                              setCardExpiry(value);
                            }}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-cvv">CVV</Label>
                          <Input
                            id="card-cvv"
                            type="password"
                            placeholder="123"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="upi" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input
                          id="upi-id"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Enter your UPI ID to complete the payment. You'll receive a notification
                          on your UPI app.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="netbanking" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Your Bank</Label>
                        <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sbi" id="sbi" />
                            <Label htmlFor="sbi">State Bank of India</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hdfc" id="hdfc" />
                            <Label htmlFor="hdfc">HDFC Bank</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="icici" id="icici" />
                            <Label htmlFor="icici">ICICI Bank</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="axis" id="axis" />
                            <Label htmlFor="axis">Axis Bank</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kotak" id="kotak" />
                            <Label htmlFor="kotak">Kotak Mahindra Bank</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>

                    <TabsContent value="paytm" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paytm-mobile">Paytm Mobile Number</Label>
                        <Input
                          id="paytm-mobile"
                          placeholder="9876543210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          maxLength={10}
                          required
                        />
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-800">
                          You'll be redirected to Paytm to complete the payment.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="phonepe" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phonepe-mobile">PhonePe Mobile Number</Label>
                        <Input
                          id="phonepe-mobile"
                          placeholder="9876543210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          maxLength={10}
                          required
                        />
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-800">
                          You'll be redirected to PhonePe to complete the payment.
                        </p>
                      </div>
                    </TabsContent>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full mt-6" disabled={processing}>
                      {processing ? 'Processing...' : `Pay ₹${course.price}`}
                    </Button>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p>{course.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p>{course.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p>{course.duration}</p>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Original Price</span>
                    <span className="line-through">₹{(course.price * 1.5).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{(course.price * 0.5).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="text-2xl">₹{course.price}</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Lifetime access
                    <br />
                    ✓ Certificate of completion
                    <br />✓ 30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
