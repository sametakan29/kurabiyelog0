import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.kurabiyelog.tech';

    // Ana sayfayı ekle
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
    ];

    // Tüm blog yazılarını otomatik olarak ekle
    const posts = getAllPosts();
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...postRoutes];
}
