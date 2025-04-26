import { ScrollArea } from "@/components/ui/ScrollArea";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
import { useEffect, useRef } from "react";

function App() {
  const scrollAreaRef = useRef<any>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };
  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  });

  return (
    <main className="flex flex-col h-screen items-center bg-black text-white">
      <header className="flex justify-between items-center w-full px-6 py-4">
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-300">PITCH</span>
          <span className="text-blue-300">FOR</span>
          <span className="text-purple-300">ME</span>
          <span className="text-green-400">BABY</span>
        </h1>
      </header>
      <div
        id="card"
        className="text-slate-950 dark:text-slate-50 lg:w-3/5 relative"
      >
        <div id="card-content" className="p-6 pt-0">
          <ScrollArea
            ref={scrollAreaRef}
            viewportRef={viewportRef}
            className="h-[85vh] flex flex-1 p-4"
          >
            <div className="flex flex-1 flex-col min-h-[80vh] justify-end">
              <MessageList
                messages={messages}
                activeTranscript={activeTranscript}
              />
            </div>
          </ScrollArea>
        </div>
        <div
          id="card-footer"
          className="flex justify-center absolute bottom-0 left-0 right-0 py-4"
        >
          <VapiButton
            audioLevel={audioLevel}
            callStatus={callStatus}
            toggleCall={toggleCall}
          />
        </div>
      </div>
      <footer className="text-center pt-4 text-gray-500 text-sm">
        © 2025 | Let me get that bread for you 👍
      </footer>
    </main>
  );
}

export default App;
