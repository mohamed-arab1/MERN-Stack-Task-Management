"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

interface TaskFormData {
  title: string;
  description: string;
}

export default function Home() {
  const  [data, setData] = useState([]);
  const [deleteTask, setDeleteTask] = useState({});
  const  [createdData, setCreatedData] = useState({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData: TaskFormData = { title, description };
      const response = await axios.post('http://localhost:3000/api/tasks', formData);
      setCreatedData(response.data)
      setOpen(false)
    } catch (err) {
      setError('Failed to create task');
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks")
      .then(
        (res) => setData(res.data)

      )
      .catch(err => console.log(err))
  }, [createdData, deleteTask])

  const handleDeleteTask = async (id: string) => {
    try {
      const deleteData = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setDeleteTask(deleteData)
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <main className="w-full xl:w-[80%] h-full relative border rounded-md border-gray-300 bg-[#212121] p-6 overflow-y-auto">
      <div className=" flex justify-between w-full">
        <h2 className="text-2xl">All Tasks</h2>
        <span onClick={() => setOpen(true)} className="w-8 h-8 border-gray-500 cursor-pointer rounded-full font-semibold text-2xl flex items-center border-2 justify-center text-[#6c7983] hover:text-white">
          +
        </span>
      </div>
      <div className="w-full grid grid-columns-3 my-3">
        <div onClick={() => setOpen(true)} className="w-full h-48 p-4 border-2 rounded-lg flex justify-center items-center cursor-pointer bg-[#181818] hover:bg-gray-700">
          + Add New Task
        </div>
          {
            data.length > 1 
            ? (
              data.map((task: {title: string, description: string, _id: string}) => (
                <div className="w-full relative h-48 p-4 border-2 rounded-lg flex flex-col gap-2 bg-[#181818] ">
                  <h2 className="text-2xl font-semibold">{task.title}</h2>
                  <p className="text-gray-600 text-base">{task.description}</p>
                  <div className="w-full flex justify-between items-center">
                    <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mt-2">
                      Completed
                    </button>
                    <div className="flex gap-2 text-[#6c7983] text-2xl">
                      <CiEdit onClick={() => setOpenEdit(true)} className="hover:text-indigo-600 cursor-pointer" />
                      <MdDelete onClick={() => handleDeleteTask(task._id)}  className="hover:text-indigo-600 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))
              ) : null
          }
        <div>
            {
              open && (
                <div className="w-full h-58 p-4 border-2 rounded-lg flex justify-center items-center bg-[#181818]">
              <form onSubmit={handleSubmit} className=" px-8 pt-1 pb-8 mb-4">
                <div className="">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
              )
            }
          </div>
      </div>
    </main>
  );
}
