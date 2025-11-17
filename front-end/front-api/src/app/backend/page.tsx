import { htmlAnalysis, imageAnalysis } from "../../lib/ai";
import Page from "../../components/Page";

export default function Home() {
  async function handleSubmit(formData: FormData) : Promise<string> {
    "use server";

    const url = formData.get("pergunta") as string;

    const result = await htmlAnalysis(url);
    return result;
  }

  async function handleImage(base64: string): Promise<string> {
    "use server";
    return await imageAnalysis(base64);
  }


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Page actionHTML={handleSubmit} actionImage={handleImage} />
    </div>
  );
}
