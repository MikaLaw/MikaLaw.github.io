import React, {FC} from "react";
import {Skeleton} from "antd";
import {getFormattedOffersCount} from "../../../tools/utils";
import classNames from "classnames";

interface OffersCounterProps {
    count: number | null | undefined;
    loading: boolean;
    countClassName?: string;
    type?: string;
    skeletonClassName?: string;
};

const OffersCounter: FC<OffersCounterProps> = (
    {
        count,
        loading,
        type,
        countClassName,
        skeletonClassName,
    }) => {
  return (
      <>
          <Skeleton
              active
              loading={loading}
              title={false}
              paragraph={{rows: 1}}
              className={classNames('menu-item-tag-skeleton', skeletonClassName)}
          >
              {count && count > 0 ? (
                  <span
                      className={classNames("menu-item-tag", countClassName ?? null , type ?? null)}
                  >
                      {getFormattedOffersCount(count ?? 0)}
                  </span>
              ):null}
          </Skeleton>
      </>
  );
};

export default OffersCounter;