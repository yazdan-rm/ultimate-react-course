import _ from "@lodash";

export const courseStatuses = [
  {
    id: 1,
    name: "فعال",
    color: "bg-green text-white",
  },
  {
    id: 2,
    name: "غیر فعال",
    color: "bg-red-700 text-white",
  },
];

function CourseStatus(props) {
  const status = _.find(courseStatuses, { id: Number(props.id) });
  if (!status)
    return (
      <div className="inline text-10 font-semibold py-4 px-12 rounded-full truncate bg-gray-500 text-white">
        وضعیت نامشخص
      </div>
    );

  return (
    <div
      style={{ fontFamily: "yekan" }}
      className={`inline text-10 font-semibold py-4 px-12 rounded-full truncate ${status.color}`}
    >
      {status.name}
    </div>
  );
}

export default CourseStatus;
