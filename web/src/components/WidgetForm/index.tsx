import { CloseButton } from '../closeButton'
import { useState } from 'react'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import feedbackImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from './steps/FeedbackTypeStep'
import { FeedbackContentStep } from './steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './steps/FeedbackSuccessStep'

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            src: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            src: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            src: feedbackImageUrl,
            alt: 'Imagem de uma nuvem de pensamento'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">


            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep 
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent = {() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className="text-x text-neutral-400">
                Desenvolvido por <a className="underline underline-offset-2" href="https://www.github.com/LODSX" target="_blank">LODS</a>
            </footer>
        </div>
    )
}