const rankers = [
  // Computer Engineering
  {
    name: "Alice Johnson",
    year: "1st Year",
    department: "Computer Engineering",
    percentage: 98.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo1.jpg",
    },
  },
  {
    name: "Bob Smith",
    year: "1st Year",
    department: "Computer Engineering",
    percentage: 96.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo2.jpg",
    },
  },
  {
    name: "Carol White",
    year: "1st Year",
    department: "Computer Engineering",
    percentage: 95.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo3.jpg",
    },
  },
  {
    name: "David Brown",
    year: "1st Year",
    department: "Computer Engineering",
    percentage: 95.3,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo4.jpg",
    },
  },
  {
    name: "Ella Green",
    year: "1st Year",
    department: "Computer Engineering",
    percentage: 94.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo5.jpg",
    },
  },
  {
    name: "Frank Adams",
    year: "2nd Year",
    department: "Computer Engineering",
    percentage: 97.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo6.jpg",
    },
  },
  {
    name: "Grace Lee",
    year: "2nd Year",
    department: "Computer Engineering",
    percentage: 96.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo7.jpg",
    },
  },
  {
    name: "Harry West",
    year: "2nd Year",
    department: "Computer Engineering",
    percentage: 96.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo8.jpg",
    },
  },
  {
    name: "Isabel Carter",
    year: "2nd Year",
    department: "Computer Engineering",
    percentage: 95.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo9.jpg",
    },
  },
  {
    name: "Jack Turner",
    year: "2nd Year",
    department: "Computer Engineering",
    percentage: 94.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo10.jpg",
    },
  },
  {
    name: "Kara Black",
    year: "3rd Year",
    department: "Computer Engineering",
    percentage: 98.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo11.jpg",
    },
  },
  {
    name: "Liam Foster",
    year: "3rd Year",
    department: "Computer Engineering",
    percentage: 97.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo12.jpg",
    },
  },
  {
    name: "Mia Bell",
    year: "3rd Year",
    department: "Computer Engineering",
    percentage: 96.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo13.jpg",
    },
  },
  {
    name: "Nate Reed",
    year: "3rd Year",
    department: "Computer Engineering",
    percentage: 95.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo14.jpg",
    },
  },
  {
    name: "Olivia Brooks",
    year: "3rd Year",
    department: "Computer Engineering",
    percentage: 94.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo15.jpg",
    },
  },

  // Civil Engineering
  {
    name: "Mason Carter",
    year: "1st Year",
    department: "Civil Engineering",
    percentage: 96.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo16.jpg",
    },
  },
  {
    name: "Lily Adams",
    year: "1st Year",
    department: "Civil Engineering",
    percentage: 94.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo17.jpg",
    },
  },
  {
    name: "Nina Bell",
    year: "1st Year",
    department: "Civil Engineering",
    percentage: 95.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo18.jpg",
    },
  },
  {
    name: "Zane Parker",
    year: "1st Year",
    department: "Civil Engineering",
    percentage: 96.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo19.jpg",
    },
  },
  {
    name: "Violet Roberts",
    year: "1st Year",
    department: "Civil Engineering",
    percentage: 94.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo20.jpg",
    },
  },
  {
    name: "Ethan Scott",
    year: "2nd Year",
    department: "Civil Engineering",
    percentage: 95.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo21.jpg",
    },
  },
  {
    name: "Sophia Clark",
    year: "2nd Year",
    department: "Civil Engineering",
    percentage: 94.3,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo22.jpg",
    },
  },
  {
    name: "Owen Davis",
    year: "2nd Year",
    department: "Civil Engineering",
    percentage: 95.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo23.jpg",
    },
  },
  {
    name: "Amelia Evans",
    year: "2nd Year",
    department: "Civil Engineering",
    percentage: 96.1,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo24.jpg",
    },
  },
  {
    name: "Noah Hughes",
    year: "2nd Year",
    department: "Civil Engineering",
    percentage: 95.2,
    photo: {
      url: "https://example.com/photo25.jpg",
      fileName: "photo25.jpg",
    },
  },
  {
    name: "Luna Taylor",
    year: "3rd Year",
    department: "Civil Engineering",
    percentage: 97.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo26.jpg",
    },
  },
  {
    name: "Jackson Morris",
    year: "3rd Year",
    department: "Civil Engineering",
    percentage: 96.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo27.jpg",
    },
  },
  {
    name: "Ella Young",
    year: "3rd Year",
    department: "Civil Engineering",
    percentage: 97.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo28.jpg",
    },
  },
  {
    name: "Lucas Anderson",
    year: "3rd Year",
    department: "Civil Engineering",
    percentage: 96.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo29.jpg",
    },
  },
  {
    name: "Ava Walker",
    year: "3rd Year",
    department: "Civil Engineering",
    percentage: 96.1,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo30.jpg",
    },
  },

  // Mechanical Engineering
  {
    name: "Emma Phillips",
    year: "1st Year",
    department: "Mechanical Engineering",
    percentage: 95.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo31.jpg",
    },
  },
  {
    name: "Liam Garcia",
    year: "1st Year",
    department: "Mechanical Engineering",
    percentage: 94.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo32.jpg",
    },
  },
  {
    name: "Isabella King",
    year: "1st Year",
    department: "Mechanical Engineering",
    percentage: 96.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo33.jpg",
    },
  },
  {
    name: "Henry Lopez",
    year: "1st Year",
    department: "Mechanical Engineering",
    percentage: 94.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo34.jpg",
    },
  },
  {
    name: "Zoe Perez",
    year: "1st Year",
    department: "Mechanical Engineering",
    percentage: 95.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo35.jpg",
    },
  },
  {
    name: "Ryan Clark",
    year: "2nd Year",
    department: "Mechanical Engineering",
    percentage: 96.3,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo36.jpg",
    },
  },
  {
    name: "Chloe Hill",
    year: "2nd Year",
    department: "Mechanical Engineering",
    percentage: 95.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo37.jpg",
    },
  },
  {
    name: "James Hall",
    year: "2nd Year",
    department: "Mechanical Engineering",
    percentage: 94.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo38.jpg",
    },
  },
  {
    name: "Ella Moore",
    year: "2nd Year",
    department: "Mechanical Engineering",
    percentage: 96.1,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo39.jpg",
    },
  },
  {
    name: "Oliver Harris",
    year: "2nd Year",
    department: "Mechanical Engineering",
    percentage: 95.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo40.jpg",
    },
  },
  {
    name: "Sophia Young",
    year: "3rd Year",
    department: "Mechanical Engineering",
    percentage: 97.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo41.jpg",
    },
  },
  {
    name: "Ethan Lee",
    year: "3rd Year",
    department: "Mechanical Engineering",
    percentage: 96.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo42.jpg",
    },
  },
  {
    name: "Aria Wilson",
    year: "3rd Year",
    department: "Mechanical Engineering",
    percentage: 97.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo43.jpg",
    },
  },
  {
    name: "Benjamin Lewis",
    year: "3rd Year",
    department: "Mechanical Engineering",
    percentage: 96.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo44.jpg",
    },
  },
  {
    name: "Harper White",
    year: "3rd Year",
    department: "Mechanical Engineering",
    percentage: 96.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo45.jpg",
    },
  },

  // Big Data
  {
    name: "Amelia Green",
    year: "1st Year",
    department: "Big Data",
    percentage: 97.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo46.jpg",
    },
  },
  {
    name: "Lucas Adams",
    year: "1st Year",
    department: "Big Data",
    percentage: 96.4,
    photo: {
      url: "https://example.com/photo47.jpg",
      fileName: "photo47.jpg",
    },
  },
  {
    name: "Zara Martin",
    year: "1st Year",
    department: "Big Data",
    percentage: 95.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo48.jpg",
    },
  },
  {
    name: "Elijah Brown",
    year: "1st Year",
    department: "Big Data",
    percentage: 95.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo49.jpg",
    },
  },
  {
    name: "Grace Thomas",
    year: "1st Year",
    department: "Big Data",
    percentage: 96.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo50.jpg",
    },
  },
  {
    name: "Levi Walker",
    year: "2nd Year",
    department: "Big Data",
    percentage: 96.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo51.jpg",
    },
  },
  {
    name: "Abigail Harris",
    year: "2nd Year",
    department: "Big Data",
    percentage: 95.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo52.jpg",
    },
  },
  {
    name: "Logan Miller",
    year: "2nd Year",
    department: "Big Data",
    percentage: 94.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo53.jpg",
    },
  },
  {
    name: "Mia Gonzalez",
    year: "2nd Year",
    department: "Big Data",
    percentage: 96.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo54.jpg",
    },
  },
  {
    name: "Henry Baker",
    year: "2nd Year",
    department: "Big Data",
    percentage: 95.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo55.jpg",
    },
  },
  {
    name: "Chloe Brooks",
    year: "3rd Year",
    department: "Big Data",
    percentage: 97.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo56.jpg",
    },
  },
  {
    name: "David Kelly",
    year: "3rd Year",
    department: "Big Data",
    percentage: 96.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo57.jpg",
    },
  },
  {
    name: "Hannah Foster",
    year: "3rd Year",
    department: "Big Data",
    percentage: 97.1,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo58.jpg",
    },
  },
  {
    name: "Mason Collins",
    year: "3rd Year",
    department: "Big Data",
    percentage: 96.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo59.jpg",
    },
  },
  {
    name: "Emily Morgan",
    year: "3rd Year",
    department: "Big Data",
    percentage: 96.3,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo60.jpg",
    },
  },

  // Artificial Intelligence
  {
    name: "Liam Foster",
    year: "1st Year",
    department: "Artificial Intelligence",
    percentage: 98.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo61.jpg",
    },
  },
  {
    name: "Emma Mitchell",
    year: "1st Year",
    department: "Artificial Intelligence",
    percentage: 97.3,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo62.jpg",
    },
  },
  {
    name: "Noah Sanders",
    year: "1st Year",
    department: "Artificial Intelligence",
    percentage: 96.7,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo63.jpg",
    },
  },
  {
    name: "Ava Peterson",
    year: "1st Year",
    department: "Artificial Intelligence",
    percentage: 96.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo64.jpg",
    },
  },
  {
    name: "James Evans",
    year: "1st Year",
    department: "Artificial Intelligence",
    percentage: 97.1,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo65.jpg",
    },
  },
  {
    name: "Sophia Reed",
    year: "2nd Year",
    department: "Artificial Intelligence",
    percentage: 97.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo66.jpg",
    },
  },
  {
    name: "Benjamin Diaz",
    year: "2nd Year",
    department: "Artificial Intelligence",
    percentage: 97.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo67.jpg",
    },
  },
  {
    name: "Olivia Brooks",
    year: "2nd Year",
    department: "Artificial Intelligence",
    percentage: 96.8,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo68.jpg",
    },
  },
  {
    name: "Ethan Ward",
    year: "2nd Year",
    department: "Artificial Intelligence",
    percentage: 96.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo69.jpg",
    },
  },
  {
    name: "Avery Hughes",
    year: "2nd Year",
    department: "Artificial Intelligence",
    percentage: 97.5,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo70.jpg",
    },
  },
  {
    name: "Charlotte Cook",
    year: "3rd Year",
    department: "Artificial Intelligence",
    percentage: 98.4,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo71.jpg",
    },
  },
  {
    name: "Landon Wood",
    year: "3rd Year",
    department: "Artificial Intelligence",
    percentage: 98.0,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo72.jpg",
    },
  },
  {
    name: "Mila Rivera",
    year: "3rd Year",
    department: "Artificial Intelligence",
    percentage: 97.9,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo73.jpg",
    },
  },
  {
    name: "Jack Murphy",
    year: "3rd Year",
    department: "Artificial Intelligence",
    percentage: 98.2,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo74.jpg",
    },
  },
  {
    name: "Harper Ross",
    year: "3rd Year",
    department: "Artificial Intelligence",
    percentage: 97.6,
    photo: {
      url: "https://vbvp.edu.in/wp-content/uploads/2023/02/VIDYAVARDHINI-logo.png",
      fileName: "photo75.jpg",
    },
  },
];

module.exports = { data: rankers };
