type AlertImageProps = {
  src: string;
};

export function AlertImage({ src }: AlertImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="alert" />;
}
