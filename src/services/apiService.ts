export interface AskTutorResponse {
  answer: string;
  source: string;
}

export async function askLabHubTutor(
  question: string,
  labContext?: string,
  practicalTitle?: string
): Promise<AskTutorResponse> {
  try {
    const res = await fetch('/api/ai/ask-tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, labContext, practicalTitle })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('API error falling back to local curriculum response:', err);
    return {
      answer: `### Academic Note\n\nFor **"${question}"**, please review the approved practical modules under Anatomy, Histology, or Bacteriology. All high-yield pointers, microscope slides, and clinical correlations are accessible in the Practical sessions.\n\n*Reference: University Medical Laboratory Curriculum.*`,
      source: 'offline-curriculum'
    };
  }
}

export const apiService = {
  askAiTutor: askLabHubTutor,
  askLabHubTutor
};
