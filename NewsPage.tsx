import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

const PageTitle: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-5 md:gap-8">
            <div className="w-28 h-0.5 bg-brand-teal"></div>
            <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-teal whitespace-nowrap drop-shadow-md">
                {title}
            </h1>
            <div className="w-28 h-0.5 bg-brand-teal"></div>
        </div>
    </div>
);

const NewsPage: React.FC = () => {
    const { newsPosts } = useContent();

    // Sort posts by date, most recent first
    const sortedPosts = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <PageTitle title="Latest News" />
                <div className="max-w-4xl mx-auto space-y-12">
                    {sortedPosts.length > 0 ? (
                        sortedPosts.map(post => (
                            <Link key={post.id} to={`/news/${post.id}`} className="block group">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                    {post.imageUrl && (
                                        <div className="overflow-hidden rounded-lg shadow-md">
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <div className={post.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                                        <p className="text-sm text-gray-500 mb-1">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-brand-teal transition-colors duration-300">{post.title}</h2>
                                        <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                                        <span className="text-brand-teal font-semibold mt-3 inline-block">Read More &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 text-lg">No news articles have been posted yet. Check back soon!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;