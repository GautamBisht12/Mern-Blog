import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p3 mx-auto min-h-screen max-w-3xl px-3">
      <h1 className="text-center text-3xl font-semibold my-7">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            placeholder="Title"
            required
            type="text"
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React Js</option>
            <option value="webdevelopment">Web Development</option>
            <option value="mern">MERN Stack</option>
          </Select>
        </div>
        <div className="flex  gap-4 items-center justify-between border-4 border-teal-600 border-dashed p-3">
          <FileInput type="file" id="image" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          className="h-72 mb-12"
          theme="snow"
          placeholder="Write your blog..."
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
