import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

const NewsPostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { newsPosts } = useContent();

    const post = newsPosts.find(p => p.id === Number(postId));

    if (!post) {
        return (
            <div className="py-12 md:py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
                <Link to="/news" className="text-brand-teal hover:underline mt-4 inline-block">
                    &larr; Back to News
                </Link>
            </div>
        );
    }
    
    // Simple way to format paragraphs from newline characters
    const paragraphs = post.content.split('\n').map((p, i) => (
        <p key={i} className="mb-4">{p}</p>
    ));

    return (
        <div className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article>
                    <Link to="/news" className="text-brand-teal hover:underline mb-8 inline-block">
                        &larr; Back to All News
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-4">{post.title}</h1>
                    <p className="text-md text-gray-500 mb-6">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    
                    {post.imageUrl && (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8" />
                    )}

                    <div className="prose lg:prose-xl max-w-none text-gray-700 text-lg leading-relaxed">
                        {paragraphs}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsPostPage;