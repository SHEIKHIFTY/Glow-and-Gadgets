// app/api/feedback/route.js
export async function POST(request) {
  try {
    const formData = await request.formData();
    const feedback = formData.get("feedback");
    const file = formData.get("file"); // Optional

    console.log("Feedback received:", feedback);
    if (file) console.log("File received:", file.name);

    // Here you can save feedback to a database if needed
    // e.g., await database.save({ feedback, file });

    return new Response(JSON.stringify({ message: "Feedback submitted successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return new Response(JSON.stringify({ message: "Failed to submit feedback" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
