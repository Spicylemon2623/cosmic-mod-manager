import { cn } from "@/lib/utils";
import useMultiSelect from "@/src/hooks/use-multi-select";
import { Cross2Icon } from "@radix-ui/react-icons";
import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import "./styles.css";

type Props = {
	inputPlaceholder: string;
	input_id: string;
	initialSelected?: string[];
	options: string[];
	setSelectedValues?: React.Dispatch<React.SetStateAction<string[]>>;
};

export function MultiSelectInput({ inputPlaceholder, initialSelected, input_id, options, setSelectedValues }: Props) {
	const { visibleList, searchTerm, setSearchTerm, selectedItems, setSelectedItems } = useMultiSelect({
		options,
	});
	const [focusedListItemIndex, setFocusedListItemIndex] = useState<number>(0);

	const changeFocusedItem = (indexShift = 1) => {
		if (focusedListItemIndex + indexShift > visibleList.length - 1) setFocusedListItemIndex(0);
		else if (focusedListItemIndex + indexShift < 0) setFocusedListItemIndex(visibleList.length - 1);
		else setFocusedListItemIndex((prev) => prev + indexShift);
	};

	const AddItemToSelectedList = (item: string) => {
		if (!selectedItems.includes(item)) {
			setSelectedItems((prev) => [...prev, item]);
		}
	};

	const RemoveItemFromSelectedList = (item: string) => {
		const newList = [];
		for (const selectedItem of selectedItems) {
			if (selectedItem !== item) newList.push(selectedItem);
		}

		setSelectedItems(newList);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (initialSelected?.length) {
			for (const val of initialSelected) {
				if (options.includes(val)) {
					AddItemToSelectedList(val);
				}
			}
		}
	}, [initialSelected]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (focusedListItemIndex > visibleList?.length - 1) {
			setFocusedListItemIndex(Math.max(0, visibleList.length - 1));
		}
	}, [visibleList]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (setSelectedValues) setSelectedValues(selectedItems);
	}, [selectedItems]);

	return (
		<div className="w-full flex flex-col">
			{selectedItems.length > 0 && (
				<div className="w-full flex gap-2 mb-2 flex-wrap">
					{selectedItems.slice(0, Math.min(3, selectedItems.length)).map((item) => {
						return (
							<div
								key={item}
								className="flex items-center justify-center gap-1 px-2 rounded-full text-sm border-2 border-accent-bg"
							>
								<span className="font-semibold text-foreground-muted">{item}</span>
								<Cross2Icon
									className="text-foreground-muted rounded-lg cursor-pointer"
									onClick={() => {
										RemoveItemFromSelectedList(item);
									}}
								/>
							</div>
						);
					})}
					{selectedItems.length > 3 && (
						<span className=" text-foreground-muted text-sm font-semibold">and {selectedItems.length - 3} more</span>
					)}
				</div>
			)}

			<div
				className="w-full flex flex-col relative multi-select-input-container"
				onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
					if (e.code === "ArrowDown") {
						changeFocusedItem(1);
					} else if (e.code === "ArrowUp") {
						changeFocusedItem(-1);
					} else if (e.code === "Enter") {
						const currentFocusedItem = visibleList[focusedListItemIndex];
						currentFocusedItem && AddItemToSelectedList(currentFocusedItem);
					}
				}}
			>
				<Input
					placeholder={inputPlaceholder}
					id={input_id}
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					className="multi-select-input focus:rounded-bl-none focus:rounded-br-none"
				/>

				<label
					htmlFor={input_id}
					className="z-10 multi-select-options-list w-full flex-col hidden absolute top-[100%] py-2 rounded-lg rounded-tl-none rounded-tr-none bg-background border border-border-hicontrast border-t-0"
				>
					<ScrollArea className="max-h-72">
						<div className="w-full">
							{visibleList.map((item, index) => {
								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<p
										key={item}
										className={cn(
											"w-full text-sm flex items-center justify-start px-4 py-2 text-foreground-muted font-semibold",
											index === focusedListItemIndex && "bg-background-shallow text-foreground",
										)}
										onMouseEnter={() => {
											setFocusedListItemIndex(index);
										}}
										onClick={() => {
											const currentFocusedItem = visibleList[focusedListItemIndex];
											currentFocusedItem && AddItemToSelectedList(currentFocusedItem);
										}}
									>
										{item}
									</p>
								);
							})}
						</div>
					</ScrollArea>
				</label>
			</div>
		</div>
	);
}
