import { PurchaseDetails } from './PaymentPage';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PurchaseSuccessProps {
  purchaseDetails: PurchaseDetails;
  onBackToCourses: () => void;
}

export function PurchaseSuccess({ purchaseDetails, onBackToCourses }: PurchaseSuccessProps) {
  const { course, user, paymentMethod, transactionId, purchaseDate, amount } = purchaseDetails;

  const downloadReceipt = () => {
    // Create a simple text receipt
    const receiptText = `
LEARNHUB - COURSE PURCHASE RECEIPT
=====================================

Transaction ID: ${transactionId}
Date: ${purchaseDate.toLocaleString()}

CUSTOMER DETAILS
Name: ${user.name}
Email: ${user.email}

COURSE DETAILS
Course: ${course.title}
Instructor: ${course.instructor}
Duration: ${course.duration}
Level: ${course.level}

PAYMENT DETAILS
Payment Method: ${paymentMethod}
Amount Paid: ₹${amount}

Thank you for your purchase!
Visit LearnHub to start learning.
=====================================
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LearnHub-Receipt-${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl text-green-600">Payment Successful!</CardTitle>
          <p className="text-gray-600 mt-2">
            Congratulations! You've successfully enrolled in the course.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Purchase Details */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3>Purchase Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono">{transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date & Time</p>
                <p>{purchaseDate.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p>{paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-2xl text-green-600">₹{amount}</p>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="border rounded-lg p-6 space-y-3">
            <h3>Course Details</h3>
            <div>
              <p className="text-sm text-gray-600">Course Name</p>
              <p>{course.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Instructor</p>
                <p>{course.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p>{course.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Level</p>
                <p>{course.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {course.rating}
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="mb-3">What's Next?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Check your email ({user.email}) for course access details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Download the course materials and start learning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Join our community forum to connect with other learners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">✓</span>
                <span>Complete the course to receive your certificate</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={downloadReceipt} variant="outline" className="flex-1">
              Download Receipt
            </Button>
            <Button onClick={onBackToCourses} className="flex-1">
              Browse More Courses
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-gray-600">
            <p>Need help? Contact us at support@learnhub.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
