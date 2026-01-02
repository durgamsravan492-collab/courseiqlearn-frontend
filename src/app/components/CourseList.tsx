import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  level: string;
  image: string;
  rating: number;
  students: number;
}

interface CourseListProps {
  user: { email: string; name: string };
  onSelectCourse: (course: Course) => void;
  onLogout: () => void;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description:
      'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB in one comprehensive course',
    price: 2999,
    instructor: 'Sarah Johnson',
    duration: '40 hours',
    level: 'Beginner',
    image: 'web development coding',
    rating: 4.8,
    students: 15420,
  },
  {
    id: '2',
    title: 'Python for Data Science & Machine Learning',
    description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-Learn, TensorFlow and more',
    price: 3499,
    instructor: 'Dr. Michael Chen',
    duration: '35 hours',
    level: 'Intermediate',
    image: 'data science python',
    rating: 4.9,
    students: 12350,
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Complete guide to user interface and user experience design with Figma',
    price: 2499,
    instructor: 'Emma Williams',
    duration: '28 hours',
    level: 'Beginner',
    image: 'ui ux design',
    rating: 4.7,
    students: 9840,
  },
  {
    id: '4',
    title: 'Mobile App Development with React Native',
    description: 'Build iOS and Android apps with React Native and JavaScript',
    price: 3199,
    instructor: 'David Martinez',
    duration: '32 hours',
    level: 'Intermediate',
    image: 'mobile app development',
    rating: 4.6,
    students: 7230,
  },
  {
    id: '5',
    title: 'Digital Marketing & SEO Complete Course',
    description: 'Master SEO, social media marketing, email marketing, and analytics',
    price: 1999,
    instructor: 'Lisa Anderson',
    duration: '24 hours',
    level: 'Beginner',
    image: 'digital marketing',
    rating: 4.5,
    students: 11560,
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS',
    description: 'Learn Amazon Web Services from basics to advanced certification',
    price: 3999,
    instructor: 'Robert Taylor',
    duration: '45 hours',
    level: 'Advanced',
    image: 'cloud computing',
    rating: 4.8,
    students: 6780,
  },
];

export function CourseList({ user, onSelectCourse, onLogout }: CourseListProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1>LearnHub</h1>
            <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2>Available Courses</h2>
          <p className="text-gray-600 mt-2">Choose a course to start your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-200">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{course.rating}</span>
                  </div>
                </div>
                <CardTitle className="mb-2">{course.title}</CardTitle>
                <CardDescription className="mb-4">{course.description}</CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>👨‍🏫</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div>
                  <span className="text-gray-500 line-through text-sm">
                    ₹{(course.price * 1.5).toFixed(0)}
                  </span>
                  <p className="text-2xl">₹{course.price}</p>
                </div>
                <Button onClick={() => onSelectCourse(course)}>Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
