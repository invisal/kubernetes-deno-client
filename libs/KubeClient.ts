import { join } from "https://deno.land/std@0.127.0/path/mod.ts";
import { parse } from "https://deno.land/std@0.82.0/encoding/yaml.ts";
import { KubeCluster } from "../common.ts";
import KubeRequest from "./KubeRequest.ts";

interface KubeConfigJson {
  apiVersion: string;
  clusters: {
    cluster: {
      "certificate-authority-data": string;
      server: string;
    };
    name: string;
  }[];
  contexts: {
    context: { cluster: string; user: string };
    name: string;
  }[];
  "current-context": string;
  kind: "Config";
  users: {
    name: string;
    user: {
      "client-certificate-data": string;
      "client-key-data": string;
    };
  }[];
}

export default class KubeClient {
  protected config?: KubeConfigJson;
  protected currentContext = "";

  loadFromDefault() {
    const homeDir = this.findHomeDir();
    if (homeDir) {
      this.loadFromFile(homeDir);
    }

    // Loading from the environment variable
    const kubePathFromEnv = Deno.env.get("KUBECONFIG");
    if (kubePathFromEnv) {
      const files = kubePathFromEnv.split(";").filter(Boolean);
      console.log(files);
    }
  }

  loadFromFile(path: string) {
    const fileContent = Deno.readTextFileSync(path);
    this.config = parse(fileContent) as KubeConfigJson;
    this.currentContext = this.config["current-context"];
  }

  useContext(context: string) {
    this.currentContext = context;
  }

  makeApiClient() {
    // Find the user of the current context
    const user = this.config?.users.find(
      (user) => user.name === this.currentContext
    );

    // Find the cluster
    const cluster = this.config?.clusters.find(
      (cluster) => cluster.name === this.currentContext
    );

    if (user && cluster) {
      return new KubeRequest(
        cluster.cluster.server,
        atob(cluster.cluster["certificate-authority-data"]),
        atob(user.user["client-key-data"]),
        atob(user.user["client-certificate-data"])
      );
    }

    throw "Cannot find current context";
  }

  getClusters(): KubeCluster[] {
    if (this.config) {
      return this.config.clusters.map((cluster) => ({
        caData: cluster.cluster["certificate-authority-data"],
        name: cluster.name,
        server: cluster.cluster.server,
      }));
    }
    return [];
  }

  private findHomeDir() {
    const envHomeDrive = Deno.env.get("HOMEDRIVE");
    const envHomePath = Deno.env.get("HOMEPATH");

    const homeDrivePath =
      envHomeDrive && envHomePath ? join(envHomeDrive, envHomePath) : undefined;

    const homePath = Deno.env.get("HOME");
    const userProfile = Deno.env.get("USERPROFILE");

    const pathList = [homePath, homeDrivePath, userProfile].filter(Boolean);

    for (const path of pathList) {
      if (!path) continue;
      try {
        const fullPath = join(path, ".kube", "config");
        if (Deno.statSync(fullPath)) return fullPath;
        // deno-lint-ignore no-empty
      } catch {}
    }

    return null;
  }
}
