interface KubeEnvVar {
  name?: string;
  value?: string;
  valueFrom?: string;
}

interface KubeEnvFromSource {
  configMapRef: {
    name?: string;
    optional?: boolean;
  };
  prefix: string;
  secretRef: {
    name: string;
    optional?: boolean;
  };
}

export default interface KubeContainer {
  args?: string[];
  command?: string[];
  env?: KubeEnvVar[];
  envFrom?: KubeEnvFromSource[];
  image?: string;
  imagePullPolicy?: "Always" | "Never" | "IfNotPresent";
  name?: string;
  ports?: {
    containerPort?: number;
    hostIP?: string;
    hostPort?: number;
    name?: string;
    protocol?: "UDP" | "TCP" | "SCTP";
  }[];

  stdin?: boolean;
  stdinOnce?: boolean;
  terminationMessagePath?: string;
  terminationMessagePolicy?: string;
  tty?: boolean;

  workingDir?: string;

  // TODO
  // - lifecycle
  // - readinessProbe
  // - resources
  // - securityContext
  // - startupProbe
  // - volumeDevices
  // - volumeMounts
}
