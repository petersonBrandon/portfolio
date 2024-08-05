"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbCopy, TbCheck, TbSearch } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToolPageWrapper } from "@/components";

// You might want to use a more comprehensive emoji list
const emojiList = [
  { emoji: "😀", name: "Grinning Face" },
  { emoji: "😃", name: "Smiling Face with Big Eyes" },
  { emoji: "😄", name: "Smiling Face with Smiling Eyes" },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes" },
  { emoji: "😆", name: "Grinning Squinting Face" },
  { emoji: "😅", name: "Grinning Face with Sweat" },
  { emoji: "🤣", name: "Rolling on the Floor Laughing" },
  { emoji: "😂", name: "Face with Tears of Joy" },
  { emoji: "🙂", name: "Slightly Smiling Face" },
  { emoji: "🙃", name: "Upside-Down Face" },
  { emoji: "😉", name: "Winking Face" },
  { emoji: "😊", name: "Smiling Face" },
  { emoji: "😇", name: "Smiling Face with Halo" },
  { emoji: "🥰", name: "Smiling Face with Hearts" },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes" },
  { emoji: "🤩", name: "Star-Struck" },
  { emoji: "😘", name: "Face Blowing a Kiss" },
  { emoji: "😗", name: "Kissing Face" },
  { emoji: "😚", name: "Kissing Face with Closed Eyes" },
  { emoji: "😙", name: "Kissing Face with Smiling Eyes" },
  { emoji: "🥲", name: "Smiling Face with Tear" },
  { emoji: "😋", name: "Face Savoring Food" },
  { emoji: "😛", name: "Face with Tongue" },
  { emoji: "😜", name: "Winking Face with Tongue" },
  { emoji: "🤪", name: "Zany Face" },
  { emoji: "😝", name: "Squinting Face with Tongue" },
  { emoji: "🤑", name: "Money-Mouth Face" },
  { emoji: "🤗", name: "Hugging Face" },
  { emoji: "🤭", name: "Face with Hand Over Mouth" },
  { emoji: "🤫", name: "Shushing Face" },
  { emoji: "🤔", name: "Thinking Face" },
  { emoji: "🤐", name: "Zipper-Mouth Face" },
  { emoji: "🤨", name: "Face with Raised Eyebrow" },
  { emoji: "😐", name: "Neutral Face" },
  { emoji: "😑", name: "Expressionless Face" },
  { emoji: "😶", name: "Face Without Mouth" },
  { emoji: "😏", name: "Smirking Face" },
  { emoji: "😒", name: "Unamused Face" },
  { emoji: "🙄", name: "Face with Rolling Eyes" },
  { emoji: "😬", name: "Grimacing Face" },
  { emoji: "🤥", name: "Lying Face" },
  { emoji: "😌", name: "Relieved Face" },
  { emoji: "😔", name: "Pensive Face" },
  { emoji: "😪", name: "Sleepy Face" },
  { emoji: "🤤", name: "Drooling Face" },
  { emoji: "😴", name: "Sleeping Face" },
  { emoji: "😷", name: "Face with Medical Mask" },
  { emoji: "🤒", name: "Face with Thermometer" },
  { emoji: "🤕", name: "Face with Head-Bandage" },
  { emoji: "🤢", name: "Nauseated Face" },
  { emoji: "🤮", name: "Face Vomiting" },
  { emoji: "🤧", name: "Sneezing Face" },
  { emoji: "🥵", name: "Hot Face" },
  { emoji: "🥶", name: "Cold Face" },
  { emoji: "🥴", name: "Woozy Face" },
  { emoji: "😵", name: "Dizzy Face" },
  { emoji: "🤯", name: "Exploding Head" },
  { emoji: "🤠", name: "Cowboy Hat Face" },
  { emoji: "🥳", name: "Partying Face" },
  { emoji: "🥸", name: "Disguised Face" },
  { emoji: "😎", name: "Smiling Face with Sunglasses" },
  { emoji: "🤓", name: "Nerd Face" },
  { emoji: "🧐", name: "Face with Monocle" },
  { emoji: "😕", name: "Confused Face" },
  { emoji: "😟", name: "Worried Face" },
  { emoji: "🙁", name: "Slightly Frowning Face" },
  { emoji: "☹️", name: "Frowning Face" },
  { emoji: "😮", name: "Face with Open Mouth" },
  { emoji: "😯", name: "Hushed Face" },
  { emoji: "😲", name: "Astonished Face" },
  { emoji: "😳", name: "Flushed Face" },
  { emoji: "🥺", name: "Pleading Face" },
  { emoji: "😦", name: "Frowning Face with Open Mouth" },
  { emoji: "😧", name: "Anguished Face" },
  { emoji: "😨", name: "Fearful Face" },
  { emoji: "😰", name: "Anxious Face with Sweat" },
  { emoji: "😥", name: "Sad but Relieved Face" },
  { emoji: "😢", name: "Crying Face" },
  { emoji: "😭", name: "Loudly Crying Face" },
  { emoji: "😱", name: "Face Screaming in Fear" },
  { emoji: "😖", name: "Confounded Face" },
  { emoji: "😣", name: "Persevering Face" },
  { emoji: "😞", name: "Disappointed Face" },
  { emoji: "😓", name: "Downcast Face with Sweat" },
  { emoji: "😩", name: "Weary Face" },
  { emoji: "😫", name: "Tired Face" },
  { emoji: "🥱", name: "Yawning Face" },
  { emoji: "😤", name: "Face with Steam From Nose" },
  { emoji: "😡", name: "Pouting Face" },
  { emoji: "😠", name: "Angry Face" },
  { emoji: "🤬", name: "Face with Symbols on Mouth" },
  { emoji: "😈", name: "Smiling Face with Horns" },
  { emoji: "👿", name: "Angry Face with Horns" },
  { emoji: "💀", name: "Skull" },
  { emoji: "☠️", name: "Skull and Crossbones" },
  { emoji: "💩", name: "Pile of Poo" },
  { emoji: "🤡", name: "Clown Face" },
  { emoji: "👹", name: "Ogre" },
  { emoji: "👺", name: "Goblin" },
  { emoji: "👻", name: "Ghost" },
  { emoji: "👽", name: "Alien" },
  { emoji: "👾", name: "Alien Monster" },
  { emoji: "🤖", name: "Robot" },
  { emoji: "😺", name: "Grinning Cat" },
  { emoji: "😸", name: "Grinning Cat with Smiling Eyes" },
  { emoji: "😹", name: "Cat with Tears of Joy" },
  { emoji: "😻", name: "Smiling Cat with Heart-Eyes" },
  { emoji: "😼", name: "Cat with Wry Smile" },
  { emoji: "😽", name: "Kissing Cat" },
  { emoji: "🙀", name: "Weary Cat" },
  { emoji: "😿", name: "Crying Cat" },
  { emoji: "😾", name: "Pouting Cat" },
  { emoji: "💋", name: "Kiss Mark" },
  { emoji: "👋", name: "Waving Hand" },
  { emoji: "🤚", name: "Raised Back of Hand" },
  { emoji: "🖐️", name: "Hand with Fingers Splayed" },
  { emoji: "✋", name: "Raised Hand" },
  { emoji: "🖖", name: "Vulcan Salute" },
  { emoji: "👌", name: "OK Hand" },
  { emoji: "🤌", name: "Pinched Fingers" },
  { emoji: "🤏", name: "Pinching Hand" },
  { emoji: "✌️", name: "Victory Hand" },
  { emoji: "🤞", name: "Crossed Fingers" },
  { emoji: "🤟", name: "Love-You Gesture" },
  { emoji: "🤘", name: "Sign of the Horns" },
  { emoji: "🤙", name: "Call Me Hand" },
  { emoji: "👈", name: "Backhand Index Pointing Left" },
  { emoji: "👉", name: "Backhand Index Pointing Right" },
  { emoji: "👆", name: "Backhand Index Pointing Up" },
  { emoji: "🖕", name: "Middle Finger" },
  { emoji: "👇", name: "Backhand Index Pointing Down" },
  { emoji: "☝️", name: "Index Pointing Up" },
  { emoji: "👍", name: "Thumbs Up" },
  { emoji: "👎", name: "Thumbs Down" },
  { emoji: "✊", name: "Raised Fist" },
  { emoji: "👊", name: "Oncoming Fist" },
  { emoji: "🤛", name: "Left-Facing Fist" },
  { emoji: "🤜", name: "Right-Facing Fist" },
  { emoji: "👏", name: "Clapping Hands" },
  { emoji: "🙌", name: "Raising Hands" },
  { emoji: "👐", name: "Open Hands" },
  { emoji: "🤲", name: "Palms Up Together" },
  { emoji: "🤝", name: "Handshake" },
  { emoji: "🙏", name: "Folded Hands" },
  { emoji: "✍️", name: "Writing Hand" },
  { emoji: "💅", name: "Nail Polish" },
  { emoji: "🤳", name: "Selfie" },
  { emoji: "💪", name: "Flexed Biceps" },
  { emoji: "🦾", name: "Mechanical Arm" },
  { emoji: "🦿", name: "Mechanical Leg" },
  { emoji: "🦵", name: "Leg" },
  { emoji: "🦶", name: "Foot" },
  { emoji: "👂", name: "Ear" },
  { emoji: "🦻", name: "Ear with Hearing Aid" },
  { emoji: "👃", name: "Nose" },
  { emoji: "🧠", name: "Brain" },
  { emoji: "🫀", name: "Anatomical Heart" },
  { emoji: "🫁", name: "Lungs" },
  { emoji: "🦷", name: "Tooth" },
  { emoji: "🦴", name: "Bone" },
  { emoji: "👀", name: "Eyes" },
  { emoji: "👁️", name: "Eye" },
  { emoji: "👅", name: "Tongue" },
  { emoji: "👄", name: "Mouth" },
  { emoji: "👶", name: "Baby" },
  { emoji: "🧒", name: "Child" },
  { emoji: "👦", name: "Boy" },
  { emoji: "👧", name: "Girl" },
  { emoji: "🧑", name: "Person" },
  { emoji: "👱", name: "Person: Blond Hair" },
  { emoji: "👨", name: "Man" },
  { emoji: "🧔", name: "Person: Beard" },
  { emoji: "👩", name: "Woman" },
  { emoji: "🧓", name: "Older Person" },
  { emoji: "👴", name: "Old Man" },
  { emoji: "👵", name: "Old Woman" },
  { emoji: "🙍", name: "Person Frowning" },
  { emoji: "🙎", name: "Person Pouting" },
  { emoji: "🙅", name: "Person Gesturing No" },
  { emoji: "🙆", name: "Person Gesturing OK" },
  { emoji: "💁", name: "Person Tipping Hand" },
  { emoji: "🙋", name: "Person Raising Hand" },
  { emoji: "🧏", name: "Deaf Person" },
  { emoji: "🙇", name: "Person Bowing" },
  { emoji: "🤦", name: "Person Facepalming" },
  { emoji: "🤷", name: "Person Shrugging" },
  { emoji: "👨‍⚕️", name: "Man Health Worker" },
  { emoji: "👩‍⚕️", name: "Woman Health Worker" },
  { emoji: "👨‍🎓", name: "Man Student" },
  { emoji: "👩‍🎓", name: "Woman Student" },
  { emoji: "👨‍🏫", name: "Man Teacher" },
  { emoji: "👩‍🏫", name: "Woman Teacher" },
  { emoji: "👨‍⚖️", name: "Man Judge" },
  { emoji: "👩‍⚖️", name: "Woman Judge" },
  { emoji: "👨‍🌾", name: "Man Farmer" },
  { emoji: "👩‍🌾", name: "Woman Farmer" },
  { emoji: "👨‍🍳", name: "Man Cook" },
  { emoji: "👩‍🍳", name: "Woman Cook" },
  { emoji: "🐶", name: "Dog Face" },
  { emoji: "🐱", name: "Cat Face" },
  { emoji: "🐭", name: "Mouse Face" },
  { emoji: "🐹", name: "Hamster Face" },
  { emoji: "🐰", name: "Rabbit Face" },
  { emoji: "🦊", name: "Fox Face" },
  { emoji: "🐻", name: "Bear Face" },
  { emoji: "🐼", name: "Panda Face" },
  { emoji: "🐨", name: "Koala" },
  { emoji: "🐯", name: "Tiger Face" },
  { emoji: "🦁", name: "Lion Face" },
  { emoji: "🐮", name: "Cow Face" },
  { emoji: "🐷", name: "Pig Face" },
  { emoji: "🐸", name: "Frog Face" },
  { emoji: "🐵", name: "Monkey Face" },
  { emoji: "🐔", name: "Chicken" },
  { emoji: "🐧", name: "Penguin" },
  { emoji: "🐦", name: "Bird" },
  { emoji: "🐤", name: "Baby Chick" },
  { emoji: "🦆", name: "Duck" },
  { emoji: "🦅", name: "Eagle" },
  { emoji: "🦉", name: "Owl" },
  { emoji: "🦇", name: "Bat" },
  { emoji: "🐺", name: "Wolf Face" },
  { emoji: "🐗", name: "Boar" },
  { emoji: "🐴", name: "Horse Face" },
  { emoji: "🦄", name: "Unicorn Face" },
  { emoji: "🐝", name: "Honeybee" },
  { emoji: "🐛", name: "Bug" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🐌", name: "Snail" },
  { emoji: "🐚", name: "Spiral Shell" },
  { emoji: "🐞", name: "Lady Beetle" },
  { emoji: "🐜", name: "Ant" },
  { emoji: "🕷️", name: "Spider" },
  { emoji: "🦂", name: "Scorpion" },
  { emoji: "🦗", name: "Cricket" },
  { emoji: "🦟", name: "Mosquito" },
  { emoji: "🐢", name: "Turtle" },
  { emoji: "🐍", name: "Snake" },
  { emoji: "🦎", name: "Lizard" },
  { emoji: "🦖", name: "T-Rex" },
  { emoji: "🦕", name: "Sauropod" },
  { emoji: "🐙", name: "Octopus" },
  { emoji: "🦑", name: "Squid" },
  { emoji: "🦐", name: "Shrimp" },
  { emoji: "🦞", name: "Lobster" },
  { emoji: "🦀", name: "Crab" },
  { emoji: "🐠", name: "Tropical Fish" },
  { emoji: "🐟", name: "Fish" },
  { emoji: "🐬", name: "Dolphin" },
  { emoji: "🐳", name: "Spouting Whale" },
  { emoji: "🐋", name: "Whale" },
  { emoji: "🦈", name: "Shark" },
  { emoji: "🐊", name: "Crocodile" },
  { emoji: "🐅", name: "Tiger" },
  { emoji: "🐆", name: "Leopard" },
  { emoji: "🦓", name: "Zebra" },
  { emoji: "🦍", name: "Gorilla" },
  { emoji: "🦧", name: "Orangutan" },
  { emoji: "🐘", name: "Elephant" },
  { emoji: "🦛", name: "Hippopotamus" },
  { emoji: "🦏", name: "Rhinoceros" },
  { emoji: "🐪", name: "Camel" },
  { emoji: "🐫", name: "Two-Hump Camel" },
  { emoji: "🦒", name: "Giraffe" },
  { emoji: "🐃", name: "Water Buffalo" },
  { emoji: "🐂", name: "Ox" },
  { emoji: "🐄", name: "Cow" },
  { emoji: "🐎", name: "Horse" },
  { emoji: "🐖", name: "Pig" },
  { emoji: "🐏", name: "Ram" },
  { emoji: "🐑", name: "Ewe" },
  { emoji: "🦙", name: "Llama" },
  { emoji: "🐐", name: "Goat" },
  { emoji: "🦌", name: "Deer" },
  { emoji: "🐕", name: "Dog" },
  { emoji: "🐩", name: "Poodle" },
  { emoji: "🦮", name: "Guide Dog" },
  { emoji: "🐕‍🦺", name: "Service Dog" },
  { emoji: "🐈", name: "Cat" },
  { emoji: "🐈‍⬛", name: "Black Cat" },
  { emoji: "🐓", name: "Rooster" },
  { emoji: "🦃", name: "Turkey" },
  { emoji: "🦚", name: "Peacock" },
  { emoji: "🦜", name: "Parrot" },
  { emoji: "🦢", name: "Swan" },
  { emoji: "🦩", name: "Flamingo" },
  { emoji: "🕊️", name: "Dove" },
  { emoji: "🐇", name: "Rabbit" },
  { emoji: "🦝", name: "Raccoon" },
  { emoji: "🦨", name: "Skunk" },
  { emoji: "🦡", name: "Badger" },
  { emoji: "🦫", name: "Beaver" },
  { emoji: "🦦", name: "Otter" },
  { emoji: "🦥", name: "Sloth" },
  { emoji: "🐁", name: "Mouse" },
  { emoji: "🐀", name: "Rat" },
  { emoji: "🐿️", name: "Chipmunk" },
  { emoji: "🦔", name: "Hedgehog" },
  { emoji: "🐾", name: "Paw Prints" },
  { emoji: "🌲", name: "Evergreen Tree" },
  { emoji: "🌳", name: "Deciduous Tree" },
  { emoji: "🌴", name: "Palm Tree" },
  { emoji: "🌵", name: "Cactus" },
  { emoji: "🌷", name: "Tulip" },
  { emoji: "🌹", name: "Rose" },
  { emoji: "🌺", name: "Hibiscus" },
  { emoji: "🌸", name: "Cherry Blossom" },
  { emoji: "🌼", name: "Blossom" },
  { emoji: "🌻", name: "Sunflower" },
  { emoji: "🌞", name: "Sun with Face" },
  { emoji: "🌝", name: "Full Moon with Face" },
  { emoji: "🌛", name: "First Quarter Moon with Face" },
  { emoji: "🌜", name: "Last Quarter Moon with Face" },
  { emoji: "🌙", name: "Crescent Moon" },
  { emoji: "💫", name: "Dizzy" },
  { emoji: "⭐", name: "Star" },
  { emoji: "🌟", name: "Glowing Star" },
  { emoji: "✨", name: "Sparkles" },
  { emoji: "⚡", name: "High Voltage" },
  { emoji: "🔥", name: "Fire" },
  { emoji: "💥", name: "Collision" },
  { emoji: "☄️", name: "Comet" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "🌊", name: "Water Wave" },
  { emoji: "🍇", name: "Grapes" },
  { emoji: "🍈", name: "Melon" },
  { emoji: "🍉", name: "Watermelon" },
  { emoji: "🍊", name: "Tangerine" },
  { emoji: "🍋", name: "Lemon" },
  { emoji: "🍌", name: "Banana" },
  { emoji: "🍍", name: "Pineapple" },
  { emoji: "🥭", name: "Mango" },
  { emoji: "🍎", name: "Red Apple" },
  { emoji: "🍏", name: "Green Apple" },
  { emoji: "🍐", name: "Pear" },
  { emoji: "🍑", name: "Peach" },
  { emoji: "🍒", name: "Cherries" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🫐", name: "Blueberries" },
  { emoji: "🥝", name: "Kiwi Fruit" },
  { emoji: "🍅", name: "Tomato" },
  { emoji: "🫒", name: "Olive" },
  { emoji: "🥥", name: "Coconut" },
  { emoji: "🥑", name: "Avocado" },
  { emoji: "🍆", name: "Eggplant" },
  { emoji: "🥔", name: "Potato" },
  { emoji: "🥕", name: "Carrot" },
  { emoji: "🌽", name: "Ear of Corn" },
  { emoji: "🌶️", name: "Hot Pepper" },
  { emoji: "🫑", name: "Bell Pepper" },
  { emoji: "🥒", name: "Cucumber" },
  { emoji: "🥬", name: "Leafy Green" },
  { emoji: "🥦", name: "Broccoli" },
  { emoji: "🧄", name: "Garlic" },
  { emoji: "🧅", name: "Onion" },
  { emoji: "🍄", name: "Mushroom" },
  { emoji: "🥜", name: "Peanuts" },
  { emoji: "🫘", name: "Beans" },
  { emoji: "🌰", name: "Chestnut" },
  { emoji: "🍞", name: "Bread" },
  { emoji: "🥐", name: "Croissant" },
  { emoji: "🥖", name: "Baguette Bread" },
  { emoji: "🫓", name: "Flatbread" },
  { emoji: "🥨", name: "Pretzel" },
  { emoji: "🥯", name: "Bagel" },
  { emoji: "🥞", name: "Pancakes" },
  { emoji: "🧇", name: "Waffle" },
  { emoji: "🧀", name: "Cheese Wedge" },
  { emoji: "🍖", name: "Meat on Bone" },
  { emoji: "🍗", name: "Poultry Leg" },
  { emoji: "🥩", name: "Cut of Meat" },
  { emoji: "🥓", name: "Bacon" },
  { emoji: "🍔", name: "Hamburger" },
  { emoji: "🍟", name: "French Fries" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🌭", name: "Hot Dog" },
  { emoji: "🥪", name: "Sandwich" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🌯", name: "Burrito" },
  { emoji: "🫔", name: "Tamale" },
  { emoji: "🥙", name: "Stuffed Flatbread" },
  { emoji: "🧆", name: "Falafel" },
  { emoji: "🥚", name: "Egg" },
  { emoji: "🍳", name: "Cooking" },
  { emoji: "🥘", name: "Shallow Pan of Food" },
  { emoji: "🍲", name: "Pot of Food" },
  { emoji: "🫕", name: "Fondue" },
  { emoji: "🥣", name: "Bowl with Spoon" },
  { emoji: "🥗", name: "Green Salad" },
  { emoji: "🍿", name: "Popcorn" },
  { emoji: "🧈", name: "Butter" },
  { emoji: "🧂", name: "Salt" },
  { emoji: "🥫", name: "Canned Food" },
  { emoji: "🍱", name: "Bento Box" },
  { emoji: "🍘", name: "Rice Cracker" },
  { emoji: "🍙", name: "Rice Ball" },
  { emoji: "🍚", name: "Cooked Rice" },
  { emoji: "🍛", name: "Curry Rice" },
  { emoji: "🍜", name: "Steaming Bowl" },
  { emoji: "🍝", name: "Spaghetti" },
  { emoji: "🍠", name: "Roasted Sweet Potato" },
  { emoji: "🍢", name: "Oden" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🍤", name: "Fried Shrimp" },
  { emoji: "🍥", name: "Fish Cake with Swirl" },
  { emoji: "🥮", name: "Moon Cake" },
  { emoji: "🍡", name: "Dango" },
  { emoji: "🥟", name: "Dumpling" },
  { emoji: "🥠", name: "Fortune Cookie" },
  { emoji: "🥡", name: "Takeout Box" },
];

const EmojiPicker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmojis, setFilteredEmojis] = useState(emojiList);
  const [copiedEmoji, setCopiedEmoji] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEmojis(emojiList);
    } else {
      const filtered = emojiList.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emoji.emoji.includes(searchTerm)
      );
      setFilteredEmojis(filtered);
    }
  }, [searchTerm]);

  const copyToClipboard = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    toast.success("Emoji copied to clipboard!");
    setTimeout(() => setCopiedEmoji(""), 1500);
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
          <h1 className="text-5xl font-bold mb-8">Emoji Picker</h1>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-6">
            <TbSearch size={24} className="text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emojis..."
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {filteredEmojis.map((emoji) => (
              <motion.button
                key={emoji.name}
                onClick={() => copyToClipboard(emoji.emoji)}
                className="bg-gray-800 hover:bg-gray-700 text-4xl aspect-square flex items-center justify-center rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {emoji.emoji}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.main>
      <ToastContainer position="bottom-right" theme="dark" />
    </ToolPageWrapper>
  );
};

export default EmojiPicker;
