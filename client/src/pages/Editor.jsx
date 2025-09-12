const Editor = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Code Editor</h1>
        <div className="bg-gray-800 rounded-lg p-4">
          <textarea
            className="w-full h-96 bg-gray-700 text-white p-4 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start coding..."
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
