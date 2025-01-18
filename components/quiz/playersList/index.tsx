"use client";

import { useMemo, useState } from "react";
import cx from "classnames";
import { debounce } from "@/scripts/debounce";
import { InputChangeType } from "@/types/form";
import { Leaderboard, LeaderboardEntry } from "@/types/quiz";
import FormGroup from "@/components/formGroup";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import Table, { ColumnProps } from "@/components/table";
import styles from "./index.module.css";

interface PlayersResultProps {
  leaderboard: Leaderboard;
}

const ITEMS_PER_PAGE = 20;

export default function PlayersResult(props: PlayersResultProps) {
  const { leaderboard } = props;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const debouncedValue = useMemo(
    () => debounce((value: string) => setQuery(value)),
    [setQuery]
  );

  const handleChange = (e: InputChangeType) => {
    setPage(1);
    debouncedValue(e.target.value);
  };

  const dataWithQuery = query
    ? leaderboard?.filter((item) =>
        item.name?.toLowerCase().includes(query.toLowerCase())
      )
    : leaderboard;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const dataWithPaging = dataWithQuery?.slice(startIndex, endIndex);

  const columns: Array<ColumnProps<LeaderboardEntry>> = [
    {
      key: "rank",
      title: "Place",
      render: (item) => (
        <div
          className={cx(styles.place, {
            [styles.gold]: item?.rank === 1,
            [styles.silver]: item?.rank === 2,
            [styles.bronze]: item?.rank === 3,
          })}
        >
          {item?.rank}
        </div>
      ),
    },
    {
      key: "name",
      title: "Player name",
    },
    {
      key: "score",
      title: "Score",
    },
  ];

  return (
    <>
      <div className={styles.topRow}>
        <h3>Other Players</h3>
        <FormGroup
          className={styles.queryField}
          label="Search for the player's name"
          isLabelHidden
        >
          <Input
            onChange={handleChange}
            placeholder="Search for the player's name"
            variant="input"
          />
        </FormGroup>
      </div>
      <Table data={dataWithPaging} columns={columns} />
      <Pagination
        currentPage={page}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
        totalItems={dataWithQuery?.length}
      />
    </>
  );
}
