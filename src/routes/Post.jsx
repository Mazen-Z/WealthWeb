import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import supabase from "../utils/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [upvoteMessage, setUpvoteMessage] = useState("");

  const handleEdit = async () => {
    if (password !== post.password) {
      setPasswordMessage("Incorrect password");
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .update({ description: editDescription })
        .eq("postid", postId)
        .eq("password", password);
      setPost((prevPost) => ({ ...prevPost, description: editDescription }));
      setIsEditing(false);
      if (error) throw error;
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handleDelete = async () => {
    if (enteredPassword !== post.password) {
        setPasswordMessage("Incorrect password");
        console.error("Incorrect password for post deletion.");
        return;
    }
    try {
        // First delete all comments associated with the post
        const deleteComments = await supabase
            .from('comments')
            .delete()
            .eq('postid', postId);

        if (deleteComments.error) {
            throw deleteComments.error;
        }

        // Then delete the post
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('postid', postId);

        if (error) {
            throw error;
        }

        setPasswordMessage("");
        setIsPasswordModalOpen(false);
        navigate("/feed");
    } catch (error) {
        console.error("Error deleting post:", error.message);
        setPasswordMessage("Error deleting post: " + error.message);
    }
  };


  const handleUpvote = async () => {
    const lastUpvoteTime = localStorage.getItem(`lastUpvoteTime_${postId}`);

    if (lastUpvoteTime && new Date() - new Date(lastUpvoteTime) < 3600000) {
      setUpvoteMessage("You can only upvote once per hour.");
      return;
    }

    try {
      const newUpvotes = post.upvotes + 1;
      const { error } = await supabase
        .from("posts")
        .update({ upvotes: newUpvotes })
        .eq("postid", postId);

      if (error) throw error;

      setPost({ ...post, upvotes: newUpvotes });
      localStorage.setItem(
        `lastUpvoteTime_${postId}`,
        new Date().toISOString()
      );
      setUpvoteMessage(""); // Clear message on successful upvote
    } catch (error) {
      console.error("Error upvoting post:", error.message);
      setUpvoteMessage("Error occurred while upvoting.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newCommentObj = {
      postid: postId,
      commenttext: newComment,
      commentdate: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from("comments").insert([newCommentObj]);

      if (error) throw error;
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error.message);
    }
  };

  const toLocalTime = (utcDate) => {
    const timeZone = "America/New_York";
    const zonedDate = utcToZonedTime(utcDate, timeZone);
    return formatDistanceToNow(zonedDate, { addSuffix: true });
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("postid", postId)
        .single();

      if (postError) console.error("Error fetching post:", postError.message);
      else setPost(postData);

      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("postid", postId)
        .order("commentdate", { ascending: false });

      if (commentsError)
        console.error("Error fetching comments:", commentsError.message);
      else setComments(commentsData);
    };

    fetchPostAndComments();
  }, [postId]);

  if (!post)
    return (
      <div className="flex justify-center items-center">
        <div className="spinner border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <div className="mb-5">
        <Link to="/feed" className=" text-blue-600 hover:text-blue-800">
          &larr; Back
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-sm font-light text-gray-600 mb-2">
          {toLocalTime(new Date(post.postdate))}
        </p>
        <h2 className="text-sm font-light text-gray-600 mb-2">
          Post ID: {post.postid}
        </h2>
        <h1 className="text-3xl font-bold mb-3">{post.name}</h1>
        <h2 className="text-2xl mb-4">{post.title}</h2>
        <p className="text-gray-700">{post.description}</p>
        <p className="text-lg font-medium">{post.upvotes} upvotes</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleUpvote}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        {upvoteMessage && (
          <p className="text-red-500 text-center mt-2">{upvoteMessage}</p>
        )}
        {isEditing && (
          <div className="mt-2">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="3"
            ></textarea>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="p-2 border rounded-lg focus:outline-none mt-2"
            />
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Submit Edit
            </button>

            {passwordMessage && (
              <p className="text-red-500 text-sm">{passwordMessage}</p>
            )}
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.commentid}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <p className="text-gray-700">• {comment.commenttext}</p>
                <div className="text-sm text-gray-600">
                  {toLocalTime(comment.commentdate)}
                </div>
              </div>
            ))}
            {isPasswordModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">Enter Password</h3>
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    placeholder="Enter password"
                    className="p-2 border rounded-lg focus:outline-none"
                  />
                  {passwordMessage && (
                    <p className="text-red-500 text-sm">{passwordMessage}</p>
                  )}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setIsPasswordModalOpen(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="3"
              placeholder="Leave a comment..."
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
