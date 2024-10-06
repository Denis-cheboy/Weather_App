import tanning from "@/public/tanning_13070843.png";
import windsock from "@/public/windsock_4629840.png";
import deupoint from "@/public/dew-point_4867875.png";
import temparature from "@/public/temperature.png";
interface HighlightCardProps {
  title: string;
  value?: string;
  unit?: string;
  type?: string;
  status?: string;
  direction?: string;
  sunrise?: string;
  sunset?: string;
}

export default function HighlightCard({
  title,
  value,
  unit,
  type,
  status,
  direction,
  sunrise,
  sunset,
}: HighlightCardProps) {
  return (
    <div className="rounded-lg bg-white p-4">
      <h3 className="mb-4  text-gray-300 text-bold">{title}</h3>
      {type === "sun" && (
        <div className="text-sm">
          <div className="mb-2 flex items-center">
            <span className="mr-2 text-2xl">🌅</span>
            <span>{sunrise}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-2xl">🌇</span>
            <span>{sunset}</span>
          </div>
        </div>
      )}
      {type === "uv" && (
        <div className="text-sm">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-3xl font-medium">{value}</span>
            <img src={tanning.src} alt="tanning" className="h-10 w-10" />
          </div>
        </div>
      )}
      {type === "humidity" && (
        <div className="text-sm">
          <div className="flex justify-between">
            <div className="mb-1 flex items-baseline">
              <span className="text-3xl font-medium">{value}</span>
              {unit && <span className="ml-1">{unit}</span>}
            </div>
            <img src={deupoint.src} alt="humidity" className="h-10 w-10" />
          </div>
        </div>
      )}
      {type === "temperature" && (
        <div className="text-sm">
          <div className="flex justify-between">
            <div className="mb-1 flex flex-col items-baseline">
              <span className="text-3xl font-medium">{value}</span>
              {unit && <span className="ml-1">{unit}</span>}
              {status && <p className="text-sm">{status}</p>}
            </div>
            <img
              src={temparature.src}
              alt="temperature"
              className="h-10 w-10"
            />
          </div>
        </div>
      )}
      {type === "wind" && (
        <div className="text-sm">
          <div className="flex justify-between">
            <div className="mb-1 flex items-baseline">
              <span className="text-3xl font-medium">{value}</span>
              {unit && <span className="ml-1">{unit}</span>}
              {status && <p className="text-sm">{status}</p>}
            </div>
            <img src={windsock.src} alt="windsock" className="h-10 w-10" />
          </div>
        </div>
      )}
      {type === "visibility" && (
        <div className="text-sm">
          <div className="mb-1 flex items-baseline">
            <span className="text-3xl font-medium">{value}</span>
            {unit && <span className="ml-1">{unit}</span>}
          </div>
          {direction && <p>Direction: {direction}</p>}
          {status && <p className="text-sm">{status}</p>}
        </div>
      )}
    </div>
  );
}
