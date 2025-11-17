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
    <div className="h-full w-full bg-black text-white flex flex-col items-center justify-center gap-4 p-6">
      <Page actionHTML={handleSubmit} actionImage={handleImage} />
    </div>
  );
}
