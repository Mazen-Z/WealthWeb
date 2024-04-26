import supabase from "../utils/supabase";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Link } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name");

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    if (searchField === "name") {
      return post.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (searchField === "postid") {
      return post.postid.toString() === searchQuery;
    }
    return true;
  });

  const toLocalTime = (utcDate) => {
    const timeZone = "America/New_York";
    const zonedDate = utcToZonedTime(utcDate, timeZone);
    return formatDistanceToNow(zonedDate, { addSuffix: true });
  };

  const fetchPosts = async (sortingMethod) => {
    try {
      setIsLoading(true);
      let query = supabase.from("posts").select("*");

      if (sortingMethod === "recent") {
        query = query.order("postdate", { ascending: false });
      } else if (sortingMethod === "upvotes") {
        query = query.order("upvotes", { ascending: false });
      }

      let { data: posts, error } = await query;

      if (error) throw error;
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-blue-300 min-h-screen">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center md:text-5xl lg:text-6xl dark:text-white ">
        Feed
      </h1>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="name">Name</option>
            <option value="postid">Post ID</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => fetchPosts("recent")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Recent
          </button>
          <button
            onClick={() => fetchPosts("upvotes")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sort by Popularity
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-4xl">
          No matching posts were found.{" "}
        </p>
      ) : (
        posts
          .filter((post) => {
            if (!searchQuery) return true;
            if (searchField === "name") {
              return post.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            }
            if (searchField === "postid") {
              return post.postid.toString() === searchQuery;
            }
            return true;
          })
          .map((post) => (
            <Link to={`/post/${post.postid}`} key={post.postid}>
              <div className="mb-4 p-4 shadow rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-gray-100">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{post.name}</h2>
                    <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-light text-gray-600 mb-2">
                      {toLocalTime(new Date(post.postdate))}
                    </p>
                    <h2 className="text-sm font-light text-gray-600 mb-2">
                      Post ID: {post.postid}
                    </h2>
                    <p className="text-lg font-medium">
                      {post.upvotes} upvotes
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
      )}
    </div>
  );
};

export default Feed;
