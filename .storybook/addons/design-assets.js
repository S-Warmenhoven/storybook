import React, { Fragment } from "react";
import { useParameter, useStorybookState, useAddonState } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { AddonPanel, ActionBar } from "@storybook/components";
import { styled } from "@storybook/theming";

const getUrl = input => {
  return typeof input === "string" ? input : input.url;
};

const Iframe = styled.iframe({
    width: "100%",
    height: "100%",
    border: "0 none"
  });
  const Img = styled.img({
    width: "100%",
    height: "100%",
    border: "0 none",
    objectFit: "contain"
  });
  
  const Asset = ({ url }) => {
    if (!url) {
      return null;
    }
    if (url.match(/\.(png|gif|jpeg|tiff|svg|anpg|webp)/)) {
      // do image viewer
      return <Img alt="" src={url} />;
    }
  
    return <Iframe title={url} src={url} />;
  };

// Notice that we're using the useParameter, this handy hook 
// will allow us to read the information supplied by the 
// addParameters option for each story, which in our case 
// will be either a single path to a asset or a list of paths. 
// You'll see it in effect shortly.

// const Content = () => {
//   const results = useParameter("assets", []); // story's parameter being retrieved here

//   return (
//     <Fragment>
//       {results.length ? (
//         <ol>
//           {results.map(i => (
//             <li>{i}</li>
//           ))}
//         </ol>
//       ) : null}
//     </Fragment>
//   );
// };

export const Content = () => {
    // story's parameter being retrieved here
    const results = useParameter("assets", []);
    // addon state being persisted here
    const [selected, setSelected] = useAddonState("my/design-assets", 0);
    // the id of the story retrieved from Storybook global state
    const { storyId } = useStorybookState();
  
    if (results.length === 0) {
      return null;
    }
  
    if (results.length && !results[selected]) {
      setSelected(0);
      return null;
    }
  
    const url = getUrl(results[selected]).replace("{id}", storyId);
    return (
      <Fragment>
        <Asset url={url} />
        {results.length > 1 ? (
          <ActionBar
            actionItems={results.map((i, index) => ({
              title: typeof i === "string" ? `asset #${index + 1}` : i.name,
              onClick: () => setSelected(index)
            }))}
          />
        ) : null}
      </Fragment>
    );
  };

addons.register("my/design-assets", () => {
    addons.add("design-assets/panel", {
      title: "assets",
      type: types.PANEL,
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <Content />
        </AddonPanel>
      )
    });
});