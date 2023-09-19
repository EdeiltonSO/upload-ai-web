import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useMemo, useState } from "react";

export function VideoInputForm() {
    const [videoFile, setVideoFile] = useState<File | null>(null)

    function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
      const { files } = event.currentTarget

      if (!files) {
        return
      }

      const selectedFile = files[0]
      setVideoFile(selectedFile)
    }

    const previewURL = useMemo(() => {
      return videoFile 
        ? URL.createObjectURL(videoFile) 
        : null
    }, [videoFile])

    return (
        <form className="space-y-6">
        <label 
          htmlFor="video" 
          className="relative border flex rounded-md aspect-video cursor-pointer border-dashe text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
        >
          {previewURL ? (
            <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0" />
            ) : (
            <>
              <FileVideo className="w-4 h-4" />
              Selecione um vídeo
            </>
          )}
        </label>

        <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
          <Textarea
            id="transcription_prompt"
            className="min-h-20 leading-relaxed"
            placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
          />
        </div>

        <Button type="submit" className="w-full">
          Carregar vídeo
          <Upload className="w-4 h-4 ml-2" />
        </Button>
      </form>
    )
}