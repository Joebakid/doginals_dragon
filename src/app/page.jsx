"use client";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { BsSortDownAlt } from "react-icons/bs";
import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const defaultRank =
    typeof window !== "undefined" ? localStorage.getItem("rank") : null;
  const [rank, setRank] = useState(defaultRank || "");

  const handleSelectRank = (e) => {
    const selectedRank = e.target.value;
    setRank(selectedRank);
    setCurrentPage(1);
    // Save selected rank to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("rank", selectedRank);
    }
  };

  useEffect(() => {
    // Fetch rank from localStorage when component mounts
    if (typeof window !== "undefined") {
      const storedRank = localStorage.getItem("rank");
      if (storedRank !== null) {
        setRank(storedRank);
      }
    }
  }, []);

  // console.log(toggle);

  const toggleSortData = () => {
    setToggle(!toggle);
    // setRank("");
  };
  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch("/data.json");
        const res = await fetch("/data.json");

        const json = await res.json();

        setData(json);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const rankOrder = { legendary: 1, rare: 2, uncommon: 3, common: 4 };
  const toggleData = [...data];
  const sortedData = toggleData?.sort((a, b) => {
    return rankOrder[a.attributes.rank] - rankOrder[b.attributes.rank];
  });
  // console.log(sortedData);

  const renderData = () => {
    const actualData = toggle ? sortedData : data;
    const filteredData = actualData?.filter((d) => {
      const nameMatch = searchTerm === "" || d.name.includes(`#${searchTerm}`);
      const rankMatch = rank === "" || d.attributes.rank === rank; // Added condition for rank
      return nameMatch && rankMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    if (currentData && currentData.length > 0) {
      // setItemsAtTime(currentData)
      return currentData.map((d, i) => (
        <Card key={d.inscriptionId} data={d} index={i} />
      ));
    } else {
      return (
        <div className="text-center mt-20 text-xl">
          {searchTerm !== "" && rank !== "" && currentData.length === 0 ? (
            "No results found."
          ) : (
            <div className="animate-pulse text-xl">Loading...</div>
          )}
        </div>
      );
    }
  };

  const actualData = toggle ? sortedData : data;
  const filteredData = actualData?.filter((d) => {
    const nameMatch = searchTerm === "" || d.name.includes(`#${searchTerm}`);
    const rankMatch = rank === "" || d.attributes.rank === rank; // Added condition for rank
    return nameMatch && rankMatch;
  });
  const renderPaginationButtons = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${
            currentPage === i
              ? "primary-gradient"
              : "border-2 border-gray-500  text-gray-500"
          }  rounded-md px-2.5 font-bold w-10 duration-150`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    // Scroll to the top of the page when the page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // const correctedJson = [];
  // data.forEach((d) => {
  //   if (
  //     d.attributes.shirt === "design" &&
  //     d.attributes.rank === "common"
  //   ) {
  //     correctedJson.push(d.name);
  //   }
  // });

  // console.log(correctedJson);

  // console.log(correctedJson);

  // correctedJson();

  // console.log(data);

  return (
    <section className="bg-gree-200 text-white">
      <div className="container mx-auto px-4 pt-2">
        <div className="text-center mt-3 text-lg">Rarity Ranking</div>

        <div className="lg:flex lg:space-x-3 justify-center mt-4 ">
          {/* <h2 className="text-xl text-center mt-0 mb-5">
            Search NFT rarity by number
          </h2> */}
          <div className="w-full relative flex space-x-2">
            <input
              type="text"
              placeholder="Type Number"
              value={searchTerm}
              className="customShadow"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute top-3 right-2 text-primary ">
              <AiOutlineSearch size={24} />
            </div>
            {/* <div
              onClick={showFilter}
              className="filter shadow-lg cursor-pointer flex justify-center items-center h-12 rounded-md bg-white text-primary w-12"
            >
              <FiFilter size={24} />
            </div> */}
          </div>
          <div className="flex justify-btween space-x-3 mt-2 lg:mt-0">
            {/* <div
              onClick={toggleSortData}
              className="bg-secTransparent customShadow cursor-pointer flex justify-center items-center h-11 rounded-lg text-primary text-lg w-30 whitespace-nowrap px-4 hover:scale-[0.95] duration-150 active:scale-100"
            >
              See Ranks
            </div> */}
            <select value={rank} onChange={handleSelectRank}>
              <option value="" key="">
                Select Rank
              </option>
              <option value="legendary" key="legendary">
                Legendary
              </option>
              <option value="rare" key="rare">
                Rare
              </option>
              <option value="uncommon" key="uncommon">
                Uncommon
              </option>
              <option value="common" key="common">
                Common
              </option>
            </select>
            <div
              onClick={toggleSortData}
              className="bg-secTransparent customShadow cursor-pointer flex justify-center items-center h-11 rounded-lg text-primary w-12 hover:scale-[0.95] duration-150 active:scale-100"
            >
              <BsSortDownAlt size={24} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* <div className="text-end">
            {itemsPerPage * currentPage} / {filteredData?.length} Assets
          </div> */}
          <div className="text-end">{filteredData?.length} Assets</div>

          <div className="image-gallery mt-5">{renderData()}</div>
        </div>

        <div className="bg-red300 flex overflow-auto hide-scroll gap-2 mt-10">
          {renderPaginationButtons()}
          {/* <button className="primary-gradient rounded-md px-2.5 font-bold">
            1
          </button>
          <button className="border-2 border-gray-500 rounded-md px-2 text-gray-500 font-bold">
            2
          </button>
          <button className="border-2 border-gray-500 rounded-md px-2 text-gray-500 font-bold">
            3
          </button> */}
        </div>
      </div>
    </section>
  );
}
