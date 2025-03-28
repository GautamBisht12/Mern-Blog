import PostListItem from "./PostListItem";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Dummy data - array of posts
  const dummyPosts = [
    {
      _id: "1",
      img: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*Z8v53FpG5MiKbLhuX5E4Yw.jpeg",
      slug: "how-to-build-a-full-stack-blog",
      title: "How to Build a Full Stack Blog with React and Node.js",
      user: {
        username: "johnsmith",
      },
      category: "Web Development",
      createdAt: "2023-10-15T14:30:00.000Z",
      desc: "Learn how to create a complete blog application using React for the frontend and Node.js for the backend. This comprehensive guide covers everything from setting up your project to deploying it to production.",
    },
    {
      _id: "2",
      img: "https://www.islamzatary.com/wp-content/uploads/2017/08/javascript-basics-1024x576.png",
      slug: "10-javascript-tips-for-beginners",
      title: "10 JavaScript Tips Every Beginner Should Know",
      user: {
        username: "sarahjones",
      },
      category: "JavaScript",
      createdAt: "2023-10-10T09:15:00.000Z",
      desc: "JavaScript can be tricky for beginners. Here are 10 essential tips that will help you write better code and avoid common pitfalls.",
    },
    {
      _id: "3",
      img: "https://example.com/images/css-tricks.jpg",
      slug: "advanced-css-techniques",
      title: "Advanced CSS Techniques for Modern Websites",
      user: {
        username: "mikebrown",
      },
      category: "CSS",
      createdAt: "2023-10-05T11:45:00.000Z",
      desc: "Take your CSS skills to the next level with these advanced techniques. Learn about CSS Grid, Flexbox, animations, and more.",
    },
    {
      _id: "4",
      slug: "react-hooks-explained",
      title: "React Hooks Explained: A Comprehensive Guide",
      user: {
        username: "emilywilson",
      },
      category: "React",
      createdAt: "2023-09-28T16:20:00.000Z",
      desc: "React Hooks have revolutionized how we write React components. This guide explains all the built-in hooks and how to create your own custom hooks.",
    },
    {
      _id: "5",
      img: "https://example.com/images/node-api.jpg",
      slug: "building-restful-apis-with-node",
      title: "Building RESTful APIs with Node.js and Express",
      user: {
        username: "alexturner",
      },
      category: "Backend",
      createdAt: "2023-09-20T13:10:00.000Z",
      desc: "Learn how to create robust and scalable RESTful APIs using Node.js and Express. This tutorial covers routing, middleware, authentication, and more.",
    },
  ];

  // Filter posts based on search params
  const filterPosts = () => {
    let filtered = [...dummyPosts];

    if (searchParams.has("author")) {
      filtered = filtered.filter(
        (post) => post.user.username === searchParams.get("author")
      );
    }

    if (searchParams.has("category")) {
      filtered = filtered.filter(
        (post) => post.category === searchParams.get("category")
      );
    }

    return filtered;
  };

  useEffect(() => {
    // Reset posts when search params change
    setPosts([]);
    setPage(1);
    setHasMore(true);

    // Initial load of posts
    loadMorePosts();
  }, [searchParams.toString()]);

  const loadMorePosts = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const filteredPosts = filterPosts();
      const postsPerPage = 2;
      const startIndex = 0;
      const endIndex = page * postsPerPage;

      const newPosts = filteredPosts.slice(startIndex, endIndex);
      setPosts(newPosts);

      // Check if we've loaded all posts
      if (endIndex >= filteredPosts.length) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }

      setLoading(false);
    }, 1000);
  };

  if (loading && posts.length === 0) return "Loading...";

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {posts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
