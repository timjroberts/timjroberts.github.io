import React, { useMemo } from "react";
import * as _jsx_runtime from "react/jsx-runtime";

export function useRawMdx(mdxCode: string): React.FC<{ components?: any }> {
	return useMemo(() => {
		const scope = { React, _jsx_runtime  };
		const rawFn = new Function(...Object.keys(scope), mdxCode);
		const { default: Component } = rawFn(...Object.values(scope));

		return Component;
	}, [ mdxCode ]);
}
