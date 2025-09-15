import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getApiKey, setApiKey } from './services/apiKey';

function Gate() {
  const [apiKey, setKey] = React.useState<string>(getApiKey());

  const save = () => {
    setApiKey(apiKey);
    location.reload(); // 保存後に再読み込み
  };

  if (!apiKey) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui', maxWidth: 520, margin: '10vh auto' }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>APIキーが必要です</h1>
        <p style={{ opacity: 0.8, marginBottom: 12 }}>
          入力したキーはこの端末の localStorage に保存され、このブラウザだけで使用されます。
        </p>
        <input
          type="password"
          placeholder="ここにAPIキーを貼り付け"
          value={apiKey}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: '100%', padding: 10 }}
        />
        <button onClick={save} style={{ marginTop: 12, padding: '8px 16px' }}>
          保存して再読み込み
        </button>
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Gate />);
