import agentCover from "../../images/Agent引擎.png";
import agentDemoVideo from "../../images/agent演示.mp4";
import boardGameCover from "../../images/智能五子棋机器人.png";
import cottonRobotCover from "../../images/棉花播种机器人.png";
import greenhouseRobotGif from "../../images/面向温室作物的盆栽表型信息获取机器人.gif";
import greenhouseRobotCover from "../../images/面向温室的盆栽表型信息获取机器人.png";
import navigationCover from "../../images/导航.png";
import navigationDemoVideo from "../../images/导航演示.mp4";
import seedlingCover from "../../images/育苗箱.png";

export type ProjectAssetMedia = {
  kind: "image" | "gif" | "video";
  src: string;
  alt: string;
  label: string;
  poster?: string;
};

type ProjectAssets = {
  coverImage?: string;
  detailMedia?: ProjectAssetMedia[];
};

const projectAssetsById: Record<string, ProjectAssets> = {
  "writing-style-agent": {
    coverImage: agentCover,
    detailMedia: [
      {
        kind: "video",
        src: agentDemoVideo,
        alt: "面向自媒体的 AI 写作与文风迁移 Agent 引擎演示视频",
        label: "Agent 演示视频",
        poster: agentCover,
      },
    ],
  },
  "ros2-mcp-nav-agent": {
    coverImage: navigationCover,
    detailMedia: [
      {
        kind: "video",
        src: navigationDemoVideo,
        alt: "ROS2具身智能导航系统演示视频",
        label: "导航演示视频",
        poster: navigationCover,
      },
    ],
  },
  "seedling-incubator": {
    coverImage: seedlingCover,
  },
  "greenhouse-phenotyping-robot": {
    coverImage: greenhouseRobotCover,
    detailMedia: [
      {
        kind: "gif",
        src: greenhouseRobotGif,
        alt: "面向温室的盆栽表型信息获取机器人项目演示 GIF",
        label: "项目演示 GIF",
      },
    ],
  },
  "cotton-seeding-robot": {
    coverImage: cottonRobotCover,
  },
  "board-game-robot": {
    coverImage: boardGameCover,
  },
};

export function getProjectAssets(projectId: string): ProjectAssets | undefined {
  return projectAssetsById[projectId];
}
