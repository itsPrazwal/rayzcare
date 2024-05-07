export const toRatio = (
  aspectRatio
) => {
    const ratio = aspectRatio ? aspectRatio.split('/') : null
    return ratio && ratio.length > 1
      ? ratio[0] / ratio[1] : null
}
