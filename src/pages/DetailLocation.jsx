import { useParams } from "react-router-dom";
import TitleHeader from "../components/TitleHeader";
import TableLocation from "../components/table/TableLocation";

export default function DetailLocation() {
  const { id } = useParams();

  return (
    <>
      <TitleHeader title={"Location"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableLocation locationId={id} />
      </div>
    </>
  );
}
