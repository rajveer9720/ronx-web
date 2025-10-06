import React from "react";
import { Colors } from "../../../utils/colors";

const Dashboard: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl space-y-6">
        <h2 className="bg-gradient-to-r from-indigo-300 via-white to-indigo-400 bg-clip-text text-transparent text-4xl font-bold animate-[gradient_6s_linear_infinite] md:text-5xl drop-shadow-md">
          Recent Activity
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-2xl hover:shadow-indigo-500/20 transition duration-300">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-700/80 p-4 rounded-xl border border-gray-600/30 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-tr from-green-400 to-green-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold shadow">
                      ID
                    </div>
                    <div>
                      <p className="text-sm text-white">
                        <span className="text-indigo-400 font-semibold">
                          ID 1909641
                        </span>{" "}
                        + 5 BUSD in{" "}
                        <span className="text-indigo-400 font-semibold">
                          x4
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">- 1 hour</p>
                    </div>
                  </div>
                  <a
                    href="#0"
                    className="text-indigo-400 text-sm hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-medium hover:brightness-110 transition duration-300 shadow-lg">
              See more
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Members total
              </h3>
              <p className="text-2xl font-bold text-white">1 909 640</p>
              <p className="text-sm text-green-400">+260</p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Members received
              </h3>
              <p className="text-lg font-bold text-white">
                152 773 785.61 BUSD
              </p>
              <p className="text-sm text-green-400">+4 115 BUSD</p>
              <p className="text-lg font-bold text-white mt-2">
                22 703.2172 BNB
              </p>
              <p className="text-sm text-green-400">+0.109 BNB</p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                 {Colors.title} BUSD Contracts
              </h3>
              <ul className="space-y-2">
                {["x3", "x4"].map((contract) => (
                  <li
                    key={contract}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white">{contract}</span>
                    <a href="#0" className="text-indigo-400 hover:underline">
                      0x...B97
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Transactions made
              </h3>
              <p className="text-2xl font-bold text-white">6 252 008</p>
              <p className="text-sm text-green-400">+350</p>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Turnover, BUSD
              </h3>
              <p className="text-lg font-bold text-white">305 547 571.22</p>
              <p className="text-sm text-green-400">+8 230</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
