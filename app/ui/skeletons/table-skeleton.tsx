export default function TableSkeleton() {
    return (
        <div className="w-full mt-6 border-t border-gray-200 animate-pulse">
            <div className="border-b-2 border-gray-300 bg-gray-100">
                <div className="flex">
                    <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                    <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                    <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                    <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex">
                        <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                        <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                        <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                        <div className="w-1/4 py-3 px-4 bg-gray-200"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};