import { type SmileG } from "./models";

declare global {
  const Global: {
    Smiles: SmileG[];
    Channel_Smiles: Record<string, SmileG[]>;
  };

  const ya: {
    speechkit: {
      settings: { apikey: string };
      Tts: new (options: { speaker: string; stopCallback: () => void }) => {
        speak: (text: string) => void;
      };
    };
  };
}
