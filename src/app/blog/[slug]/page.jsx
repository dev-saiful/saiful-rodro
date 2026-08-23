
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { getPost } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import BlogReadTracker from "@/components/BlogReadTracker"

// Helper function to generate metadata
async function generatePostMetadata(post) {
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : 
    "https://opengraph.b-cdn.net/production/images/e808986d-d75f-49f9-8195-591e7045bfe8.png?token=j1mfqhXRk-3IvoFD_mrlcoO4BvIErDyzFjLARxwF_Y0&height=500&width=500&expires=33269063711"


  return {
    title: `${post.title} | Saiful's Blog`,
    description: post?.description || "Read this interesting article on Saiful's Blog",
    // keywords: keywords.join(", "),
    authors: [{ name: post.author?.name }],
    openGraph: {
      type: "article",
      title: `${post.title} | Saiful's Blog`,
      description: post.description || "Read this interesting article on Saiful's Blog",
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      publishedTime: post.publishedAt,
      authors: post.author?.name,
      siteName: "Saiful's Blog",
    },
    twitter: {
      card: "summary_large_image",
      site: "@saiful",
      creator: "@saiful",
      title: `${post.title} | Saiful's Blog`,
      description: post.description || "Read this interesting article on Saiful's Blog",
      images: [imageUrl],
    }
  }
}

// This function generates both the metadata and gets the post data
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return generatePostMetadata(post)
}

const ptComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl sm:text-4xl font-bold mt-12 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl sm:text-3xl font-bold mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg sm:text-2xl font-bold mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-lg">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-8">
          <div className="relative aspect-video">
            <Image
              src={urlFor(value).url() || "/placeholder.svg"}
              alt={value.alt || "Blog post image"}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
    link: ({ children, value }) => (
      <Link href={value.href} className="text-primary hover:underline">
        {children}
      </Link>
    ),
  },
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)

  

  if (!post) {
    return <div className="text-ink text-center py-10">Post not found</div>
  }

  return (
    <div className="w-full bg-bg text-ink py-10">
      <BlogReadTracker
        title={post.title}
        slug={post.slug.current}
        category={post.categories?.[0]?.title || "uncategorized"}
      />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center">
              <Image
                src={urlFor(post.author.image).url() || "/placeholder.svg"}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
          <div className="relative aspect-video w-full mb-8">
            <Image
              src={urlFor(post.mainImage).url() || "/placeholder.svg"}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} components={ptComponents} />
        </div>

        <footer className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link key={category._id} href={`/blog/category/${category.title.toLowerCase()}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {category.title}
                </Badge>
              </Link>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}