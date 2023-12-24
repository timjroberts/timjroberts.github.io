import React, { useMemo } from "react";
import * as _jsx_runtime from "react/jsx-runtime";

export function useMdxComponent(mdxCode: string): React.FC<{ components?: any }> {
	return useMemo(() => {
		if (!mdxCode?.length) return null;

		const scope = { React, _jsx_runtime  };
		const rawFn = new Function(...Object.keys(scope), mdxCode);
		const { default: Component } = rawFn(...Object.values(scope));

		return Component;
	}, [ mdxCode ]);
}
