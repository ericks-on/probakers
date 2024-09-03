import Image from 'next/image';

interface BlogPost {
    title: string;
    imageUrl: string;
    content: string;
}

const blogPosts: BlogPost[] = [
    {
        title: 'Managing Your Kitchen with Ease',
        imageUrl: '/images/kit1.jpg',
        content: 'Our app streamlines the management of raw products, kitchen items, and sales. With just a few clicks, you can track inventory, monitor sales, and ensure everything runs smoothly in your kitchen. Plus, you can print detailed reports for easy record-keeping.',
    },
    {
        title: 'Optimizing Sales and Inventory',
        imageUrl: '/images/kit2.jpg',
        content: 'Stay on top of your sales and inventory with our app. It provides real-time updates and helps you make informed decisions. Whether it\'s adjusting stock levels or analyzing sales trends, our app has you covered.',
    },
    // Add more blog posts as needed
];

const Blog = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid gap-8 lg:grid-cols-2">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    width={800}
                                    height={450}
                                    className="rounded-md object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                            <p className="text-gray-700">{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
