import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG:{
        title: "Reportar bug",
        image: {
            src: bugImageUrl,
            alt: "Inseto"
        }
    },
    IDEA:{
        title: "Enviar ideia",
        image: {
            src: ideaImageUrl,
            alt: "Lâmpada"
        }
    },
    OTHER:{
        title: "Outro",
        image: {
            src: thoughtImageUrl,
            alt: "Balão de pensamento"
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleRestartFeedback = () => {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    { !feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}


            <footer className="text-xs text-neutral-400">
            Feito com ♥ pela <a href="https://rocketseat.com.br" className="underline underline-offset-1" target="_blank">Rocketseat</a>
            </footer>
        </div>
    )
}