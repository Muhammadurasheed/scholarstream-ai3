import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message: string;
  details?: string;
};

export default class SidepanelErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: 'Something went wrong.' };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while loading the side panel.';

    const isFirebaseConfigIssue =
      typeof message === 'string' &&
      (message.includes('Firebase configuration incomplete') ||
        message.includes('auth/invalid-api-key'));

    return {
      hasError: true,
      message: isFirebaseConfigIssue
        ? 'Firebase configuration is missing/invalid for the extension build.'
        : 'The side panel crashed while loading.',
      details: message,
    };
  }

  componentDidCatch(error: unknown) {
    // Log for debugging (visible in extension devtools)
    console.error('[SidepanelErrorBoundary]', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          padding: 16,
          color: '#111827',
        }}
      >
        <h1 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          ScholarStream Co-Pilot
        </h1>
        <p style={{ marginBottom: 12 }}>{this.state.message}</p>

        <section
          style={{
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6 }}>How to fix</div>
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 1.5 }}>
            <li>
              Ensure your Firebase env vars exist in the project root <code>.env</code>
              (or <code>extension/.env</code>)
            </li>
            <li>
              Rebuild the extension: <code>cd extension && npm run build</code>
            </li>
            <li>
              In <code>chrome://extensions</code>, reload the extension and refresh the tab.
            </li>
          </ol>
        </section>

        <details>
          <summary style={{ cursor: 'pointer' }}>Technical details</summary>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              background: '#0b1020',
              color: '#e5e7eb',
              padding: 12,
              borderRadius: 10,
              marginTop: 8,
              fontSize: 12,
            }}
          >
            {this.state.details}
          </pre>
        </details>
      </main>
    );
  }
}
