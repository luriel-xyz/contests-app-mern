import { connectClient, stopClient } from "../server/db";

// Function to insert sample contest data into the database
async function main() {
  // Connect to the MongoDB client
  const client = await connectClient();

  // Delete any existing documents in the "contests" collection
  await client.collection("contests").deleteMany({});

  // Insert sample contest data into the "contests" collection
  const resp = await client.collection("contests").insertMany([
    {
      id: "artistic-impressions",
      categoryName: "Contest",
      contestName: "Artistic Impressions",
      description:
        "Welcome to the Artistic Impressions contest! We invite artists from all backgrounds to showcase their creativity and express their unique perspectives through various art forms. Whether you're a painter, sculptor, photographer, or digital artist, this contest is the perfect platform to share your artistic talent. The theme for this contest is 'Nature's Beauty,' so let your imagination run wild and capture the awe-inspiring beauty of the natural world. Participants will have the opportunity to win exciting prizes and have their artwork featured in a prestigious art exhibition. Join us in celebrating the power of art and its ability to inspire and evoke emotions!",
      names: [
        {
          id: "nature-expressions",
          name: "Nature Expressions",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
        {
          id: "art-nature",
          name: "Art & Nature",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
      ],
    },
    {
      id: "mind-assembler",
      categoryName: "Education",
      contestName: "Cognitive Building Bricks",
      description:
        "This product is a classroom tool that scaffolds higher order thinking. It's a collaborative strategy that uses building bricks to help structure students' ideas. Learners build knowledge structures with information attached to different colored bricks. Students' desks are turned into workshops where they physically manipulate information into meaningful creations. They show sequences of information, like stories, rank information by importance, and develop essential cognitive skills needed at school. The end result is clarity in thought and improved collaborative conversations. I want this to be marketed as a sophisticated knowledge tool applicable to all ages and subjects. It gives students a cognitive edge, enhancing their learning capabilities.\n\nI want to continue with the construction/building theme as well as the mind/brain/learning theme. They need to be blended somehow. Teachers find it easier to talk about building/scaffolding analogies as it's less abstract.",
      names: [
        {
          id: "mental-builder",
          name: "Mind Builder",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
        {
          id: "cognitive-scaffold",
          name: "Cognitive Scaffold",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
      ],
    },
    {
      id: "sustainable-food-education",
      categoryName: "Education",
      contestName: "Educating People about Sustainable Food Production",
      description: "Educating people about sustainable food production",
      names: [],
    },
    {
      id: "cash-analytics-big-data",
      categoryName: "Software",
      contestName: "Big Data Analytics for Cash Circulation",
      description:
        "Data is created at every touch point in a note's life-cycle. Because of the volume of the data, it can be difficult to store, analyze and gain insight. Collecting, processing and analyzing the data using big data technologies and displaying the results in an interactive display makes it easy to make informative decisions, overcome problems and plan for the future.\n\nIt works using big data technologies and displays the results in modern browsers, combining powerful visualisation components and a data-driven approach to interact with the data.\n\nIt enables you to analyze data that were not previously possible. The volume, variety, complexity of the analytical processing involved, and the responsiveness required are now achievable with the product. Gaining smarter decision making but also provide faster time to value.",
      names: [
        {
          id: "cash-insights",
          name: "Cash Insights",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
        {
          id: "currency-analytics",
          name: "Currency Analytics",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
        {
          id: "cash-visualizer",
          name: "Cash Visualizer",
          timestamp: "2023-06-07T00:00:00.000Z",
        },
      ],
    },
    {
      id: "programming-books-hub",
      categoryName: "Website",
      contestName: "Free Programming Books",
      description:
        "A list of free online programming books, categorized by languages/topics",
      names: [],
    },
  ]);

  // Log the number of inserted contests
  console.info("Inserted Contests:", resp.insertedCount);

  // Stop the MongoDB client
  stopClient();
}

main();
