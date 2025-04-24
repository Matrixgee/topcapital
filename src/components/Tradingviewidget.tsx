import React, { useEffect, useRef } from "react";

const TradingViewWidget: React.FC = () => {
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const scriptAppendedRef = useRef(false); // Ref to track if the script has been appended

  useEffect(() => {
    if (widgetContainerRef.current && !scriptAppendedRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "INDEX:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "2",
        locale: "en",
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });
      widgetContainerRef.current.appendChild(script);

      console.log("TradingView script appended");
      scriptAppendedRef.current = true; // Mark the script as appended

      return () => {
        if (
          widgetContainerRef.current &&
          widgetContainerRef.current.contains(script)
        ) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          widgetContainerRef.current.removeChild(script);
          scriptAppendedRef.current = false; // Reset the ref when the component unmounts
        }
      };
    } else {
      console.error(
        "Container for TradingView widget not found or script already appended"
      );
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        ref={widgetContainerRef}
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  );
};

export default TradingViewWidget;
