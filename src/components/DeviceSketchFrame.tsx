import React, { useState } from 'react';
import { StylizedScreenshot } from '../types/tutorial';
import { Wifi, Battery, Signal, ArrowUpRight, Terminal as TerminalIcon, CheckCircle2, Info } from 'lucide-react';

interface DeviceSketchFrameProps {
  screenshot: StylizedScreenshot;
}

export const DeviceSketchFrame: React.FC<DeviceSketchFrameProps> = ({ screenshot }) => {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(
    screenshot.annotations.length > 0 ? screenshot.annotations[0].id : null
  );

  return (
    <div className="my-6">
      {/* Device Specs Header Bar (Pencil Style) */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-3 py-2 bg-paper-200/80 border-b-2 border-dashed border-pencil/40 rounded-t text-xs font-mono text-pencil-light">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-pencil-dark">规格:</span>
          <span className="bg-paper-100 px-2 py-0.5 border border-pencil/30 rounded">{screenshot.deviceSpec}</span>
          <span className="bg-paper-100 px-2 py-0.5 border border-pencil/30 rounded">{screenshot.screenResolution}</span>
        </div>
      </div>

      {/* Frame Container */}
      <div className="relative flex flex-col lg:flex-row items-center gap-6 p-4 sm:p-6 bg-paper-100/90 border-2 border-pencil rounded-xl shadow-pencil">
        {/* Device Graphic Screen Frame */}
        <div className="w-full max-w-sm sm:max-w-md flex-shrink-0 flex justify-center">
          {screenshot.deviceType === 'iphone' && (
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] bg-[#1a1b1e] rounded-[48px] p-3 border-4 border-pencil shadow-pencil-lg">
              {/* iPhone Notch / Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#112233] border border-gray-700"></div>
              </div>
              
              {/* iPhone Screen Content */}
              <div className="w-full h-full bg-[#f8fafc] text-gray-900 rounded-[38px] overflow-hidden flex flex-col pt-8 pb-4 px-3.5 relative font-sans text-xs">
                {/* iOS Status Bar */}
                <div className="flex justify-between items-center text-[10px] font-semibold text-gray-600 px-2 mb-2">
                  <span>09:41</span>
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Mock UI Content */}
                <div className="flex-1 flex flex-col gap-2.5 overflow-hidden">
                  {/* Status Banner */}
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {screenshot.mockData.status}
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">{screenshot.mockData.outboundMode}</div>
                    </div>
                    <span className="text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">TUN</span>
                  </div>

                  {/* Traffic Stats */}
                  {screenshot.mockData.trafficTotal && (
                    <div className="bg-gray-100 rounded-lg p-2 text-[10px] text-gray-600 flex justify-between">
                      <span>{screenshot.mockData.trafficTotal}</span>
                      <ArrowUpRight className="w-3 h-3 text-blue-600" />
                    </div>
                  )}

                  {/* Node List */}
                  <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">当前测速与节点列表</div>
                    {screenshot.mockData.activeNodes?.map((node, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-lg border text-[11px] flex items-center justify-between transition-all ${
                          node.selected 
                            ? 'bg-blue-50 border-blue-400 font-semibold text-blue-900 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="truncate pr-1">
                          <div>{node.name}</div>
                          <span className="text-[9px] text-gray-400 font-mono">{node.type}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          node.ping < 50 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {node.ping}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Bar */}
                <div className="w-32 h-1 bg-gray-400 rounded-full mx-auto mt-2"></div>
              </div>
            </div>
          )}

          {screenshot.deviceType === 'macbook' && (
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] flex flex-col items-center">
              {/* Laptop Screen */}
              <div className="w-full aspect-[16/10] bg-[#1e2024] rounded-t-xl p-2.5 border-4 border-pencil shadow-pencil">
                <div className="w-full h-full bg-[#f5f6f8] rounded-md overflow-hidden flex flex-col text-xs text-gray-800">
                  {/* macOS Titlebar */}
                  <div className="h-6 bg-gray-200/90 border-b border-gray-300 flex items-center px-2.5 justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500"></div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{screenshot.title}</span>
                    <div className="w-8"></div>
                  </div>

                  {/* macOS Mock UI */}
                  <div className="flex-1 p-3 flex flex-col gap-2 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex justify-between items-center bg-blue-50/80 p-2 border border-blue-200 rounded">
                      <div>
                        <div className="font-bold text-[11px] text-blue-900">{screenshot.mockData.status}</div>
                        <div className="text-[10px] text-blue-600">{screenshot.mockData.outboundMode}</div>
                      </div>
                      <span className="text-[10px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded">Mihomo TUN</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      {screenshot.mockData.activeNodes?.map((node, i) => (
                        <div key={i} className={`p-1.5 rounded border ${node.selected ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-gray-200'}`}>
                          <div className="font-semibold truncate">{node.name}</div>
                          <div className="flex justify-between text-[9px] text-gray-500 mt-1">
                            <span>{node.type}</span>
                            <span className="text-green-600 font-bold">{node.ping}ms</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {screenshot.mockData.logs && (
                      <div className="mt-auto bg-gray-900 text-green-400 font-mono text-[9px] p-2 rounded max-h-16 overflow-hidden">
                        {screenshot.mockData.logs.slice(0, 2).map((log, i) => (
                          <div key={i} className="truncate">{log}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base & Trackpad */}
              <div className="w-[108%] h-4 bg-gray-300 border-x-4 border-b-4 border-pencil rounded-b-xl relative shadow-pencil">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-b"></div>
              </div>
            </div>
          )}

          {screenshot.deviceType === 'android' && (
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] bg-[#222] rounded-[36px] p-2.5 border-4 border-pencil shadow-pencil-lg">
              {/* Android Punch Hole Camera */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-20 border border-gray-700"></div>

              {/* Screen */}
              <div className="w-full h-full bg-[#f4f6fa] text-gray-900 rounded-[28px] overflow-hidden flex flex-col pt-7 pb-4 px-3.5 font-sans text-xs">
                {/* Android Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-gray-500 px-1 mb-2">
                  <span>09:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    <Signal className="w-3 h-3" />
                    <span>85%</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-sm">
                    <div className="font-bold text-[11px]">{screenshot.mockData.status}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{screenshot.mockData.outboundMode}</div>
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5">
                    {screenshot.mockData.activeNodes?.map((node, idx) => (
                      <div key={idx} className={`p-2 rounded-lg border text-[11px] flex justify-between items-center ${node.selected ? 'bg-amber-50 border-amber-400' : 'bg-white border-gray-200'}`}>
                        <div>
                          <div className="font-medium">{node.name}</div>
                          <span className="text-[9px] text-gray-400 font-mono">{node.type}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700">{node.ping}ms</span>
                      </div>
                    ))}
                  </div>

                  {/* Android Floating Button */}
                  <div className="flex justify-end p-1">
                    <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-pencil">
                      V
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {screenshot.deviceType === 'windows' && (
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] flex flex-col items-center">
              {/* Monitor Screen */}
              <div className="w-full aspect-[16/10] bg-[#1f232a] rounded-lg p-2 border-4 border-pencil shadow-pencil">
                <div className="w-full h-full bg-[#f0f2f5] rounded overflow-hidden flex flex-col text-xs text-gray-800">
                  {/* Windows 11 Title Bar */}
                  <div className="h-6 bg-[#e1e4e8] border-b border-gray-300 flex items-center justify-between px-2">
                    <span className="text-[10px] font-semibold text-gray-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded bg-blue-500"></span>
                      {screenshot.title}
                    </span>
                    <div className="flex items-center text-[10px] text-gray-500">
                      <span className="px-1.5 hover:bg-gray-300">─</span>
                      <span className="px-1.5 hover:bg-gray-300">□</span>
                      <span className="px-1.5 hover:bg-red-500 hover:text-white">✕</span>
                    </div>
                  </div>

                  {/* Table Layout */}
                  <div className="flex-1 p-2 flex flex-col gap-2">
                    <div className="bg-white border border-gray-200 rounded p-1.5 text-[10px] font-mono flex justify-between">
                      <span className="font-bold text-blue-800">{screenshot.mockData.status}</span>
                      <span className="text-gray-500">{screenshot.mockData.outboundMode}</span>
                    </div>

                    <div className="border border-gray-300 rounded overflow-hidden bg-white text-[10px]">
                      <div className="bg-gray-100 p-1 font-bold text-gray-600 flex justify-between border-b">
                        <span>节点别名 (Name)</span>
                        <span>协议 (Core)</span>
                        <span>真实延迟 (Ping)</span>
                      </div>
                      {screenshot.mockData.activeNodes?.map((n, idx) => (
                        <div key={idx} className={`p-1 flex justify-between border-b ${n.selected ? 'bg-blue-100 text-blue-900 font-semibold' : ''}`}>
                          <span className="truncate pr-1">{n.name}</span>
                          <span className="text-gray-500">{n.type}</span>
                          <span className="text-green-700 font-mono font-bold">{n.ping}ms</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto bg-gray-200 p-1 text-[9px] text-gray-600 flex justify-between rounded">
                      <span>系统代理: 自动配置</span>
                      <span>TUN模式: 已启用</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stand */}
              <div className="w-12 h-6 bg-gray-400 border-x-2 border-pencil"></div>
              <div className="w-32 h-2.5 bg-gray-500 border-2 border-pencil rounded-full shadow-pencil"></div>
            </div>
          )}

          {screenshot.deviceType === 'terminal' && (
            <div className="w-full max-w-[420px] aspect-[16/10] bg-[#121417] rounded-lg p-2.5 border-4 border-pencil shadow-pencil font-mono text-[10px] text-emerald-400 flex flex-col">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-800 text-gray-400">
                <div className="flex items-center gap-1.5">
                  <TerminalIcon className="w-3 h-3 text-emerald-500" />
                  <span>{screenshot.deviceSpec.includes('OpenWrt') ? 'root@OpenWrt:~# (openclash)' : 'gao@linux-box: ~ (proxy/core)'}</span>
                </div>
                <span className="text-[9px] text-gray-600">{screenshot.deviceSpec.includes('OpenWrt') ? 'ash (OpenWrt)' : 'bash 5.2'}</span>
              </div>

              {/* Console logs */}
              <div className="flex-1 flex flex-col gap-1 overflow-hidden leading-relaxed">
                <div className="text-gray-400">$ sudo systemctl status proxy-core.service</div>
                <div className="text-emerald-300">● proxy-core.service - High-Performance Transparent Proxy</div>
                <div className="text-gray-500">   Loaded: loaded (/etc/systemd/system/proxy.service; enabled)</div>
                <div className="text-green-400">   Active: active (running) since Mon 2026-03-24 10:14:02 UTC</div>
                <div className="text-gray-400 mt-1">$ cat /proc/net/dev | grep tun0</div>
                <div className="text-cyan-300">   tun0: {screenshot.mockData.trafficTotal} (Zero Packet Loss)</div>
                <div className="text-gray-400 mt-1">$ proxy-cli ping --fastest</div>
                {screenshot.mockData.activeNodes?.slice(0, 2).map((n, i) => (
                  <div key={i} className="text-amber-300">
                    {'>>'} [{n.type}] {n.name} - <span className="text-green-400 font-bold">{n.ping}ms</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Annotations & Callouts Sidebar */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          {screenshot.annotations.map((ann) => {
            const isSelected = activeAnnotation === ann.id;
            return (
              <div
                key={ann.id}
                onClick={() => setActiveAnnotation(ann.id)}
                className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-paper-50 border-pencil shadow-pencil translate-x-1' 
                    : 'bg-paper-200/50 border-dashed border-pencil/40 hover:border-pencil/80'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-xs font-bold font-mono ${
                    isSelected ? 'bg-pencil text-paper-100' : 'bg-pencil/10 text-pencil'
                  }`}>
                    {ann.label}
                  </span>
                  <p className="text-xs text-pencil-dark font-sans leading-normal">
                    {ann.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
