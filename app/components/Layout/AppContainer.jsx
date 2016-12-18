

function AppContainer(props) {
  const { navbar, content, footer } = props;
  return (
    <div className="AppContainer__wrapper">
      <div className="AppContainer__header">
        <navbar />
      </div>
      <div className="AppContainer__content">
        <content/>
      </div>
      <div className="AppContainer__footer">
        <footer/>
      </div>
    </div>
  );
}

function AppContent(props) {
  return (
    <div>

    </div>
  );
}