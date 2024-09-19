"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, Reorder } from "framer-motion";
import { TbPlus, TbTrash, TbCheck, TbGripVertical } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <motion.div
      className="w-6 h-6 rounded-md border-2 border-blue-500 flex items-center justify-center cursor-pointer"
      onClick={onChange}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ scale: checked ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <TbCheck className="text-blue-500" size={16} />
      </motion.div>
    </motion.div>
  );
};

const STORAGE_KEY = "checklist_items";

const ChecklistTool: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState<string>("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants: Variants = {
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const updateLocalStorage = (newItems: ChecklistItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const addItem = (): void => {
    if (newItemText.trim() !== "") {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        text: newItemText,
        completed: false,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
      setNewItemText("");
      toast.success("Item added to checklist!");
    }
  };

  const toggleItem = (id: string): void => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const removeItem = (id: string): void => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
    toast.info("Item removed from checklist.");
  };

  return (
    <ToolPageWrapper>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">Checklist Tool</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-6">
            <input
              type="text"
              value={newItemText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewItemText(e.target.value)
              }
              placeholder="Add new item..."
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
              onKeyPress={(e: React.KeyboardEvent) =>
                e.key === "Enter" && addItem()
              }
            />
            <motion.button
              onClick={addItem}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300"
              variants={buttonVariants}
              whileTap="tap"
            >
              <TbPlus size={24} />
            </motion.button>
          </div>

          <Reorder.Group
            axis="y"
            values={items}
            onReorder={setItems}
            className="space-y-2"
          >
            <AnimatePresence>
              {items.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div className="cursor-move">
                        <TbGripVertical size={20} className="text-gray-500" />
                      </motion.div>
                      <CustomCheckbox
                        checked={item.completed}
                        onChange={() => toggleItem(item.id)}
                      />
                      <span
                        className={
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }
                      >
                        {item.text}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      variants={buttonVariants}
                      whileTap="tap"
                    >
                      <TbTrash size={20} />
                    </motion.button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default ChecklistTool;
